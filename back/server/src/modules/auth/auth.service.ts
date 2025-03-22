import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { IJwtPayload } from "src/shared/interfaces/jwtPayload.interface";
import { UserEntity } from "../user/entities/user.entity";
import { I18nService } from "nestjs-i18n";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { ConfigService } from "@nestjs/config";
import { join } from "path";
import * as fs from "fs";
@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(JwtService)
    private jwtService: JwtService,
    @Inject(I18nService)
    private readonly i18n: I18nService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {}

  async login({
    email,
    pass,
  }: {
    email: string;
    pass: string;
  }): Promise<{ access_token: string; message: string }> {
    const user = await this.userService.findByEmailWithPassword(email);
    if (!user)
      throw new UnauthorizedException(this.i18n.t("events.commons.notFound"));

    if (user.active === false)
      throw new UnauthorizedException(
        this.i18n.t("events.commons.userInactive"),
      );

    if (user.isGoogleLogin)
      throw new UnauthorizedException(
        this.i18n.t("events.commons.googleLogin"),
      );
    const passwordIsValid = await this.userService.comparePassword(
      pass,
      user.password,
    );
    if (!passwordIsValid)
      throw new UnauthorizedException(
        this.i18n.t("events.commons.invalidCredentials"),
      );

    if (user && passwordIsValid) return this.tokenGenerate(user);
  }

  async loginGoogle(id: number) {
    const { data: userExists } = await this.userService.findById(id);
    if (!userExists)
      throw new UnauthorizedException(this.i18n.t("events.commons.notFound"));
    return this.tokenGenerate({
      email: userExists.email,
      id: userExists.id,
    });
  }

  async validateGoogleUser(user: CreateUserDto): Promise<any> {
    try {
      const userExists = await this.userService.findByEmail(user.email);
      if (!userExists) return await this.userService.create(user);
      return userExists;
    } catch (error) {
      throw error;
    }
  }

  async findUserWithPassword(email: string): Promise<UserEntity> {
    try {
      return await this.userService.findByEmailWithPassword(email);
    } catch (error) {
      throw error;
    }
  }

  //#region TOKEN
  async tokenGenerate(payload: {
    email: string;
    id: number;
  }): Promise<{ access_token: string; message: string }> {
    try {
      const payloadToken = {
        email: payload.email,
        id: payload.id,
      };

      const keyPath =
        this.configService.get<string>("KEY_PATH") ||
        join(__dirname, "../../chaves");
      const filepath = join(keyPath, "private_key.pem");
      const privateKey = fs.readFileSync(filepath, "utf8");
      const access_token = this.jwtService.sign(payloadToken, {
        secret: privateKey,
        algorithm: "ES512",
      });
      return {
        access_token,
        message: this.i18n.t("events.commons.success"),
      };
    } catch (error) {
      console.error("Error generating token:", error);
      throw error;
    }
  }

  async verifyToken(token: string): Promise<IJwtPayload> {
    try {
      const keyPath =
        this.configService.get<string>("KEY_PATH") ||
        join(__dirname, "../../chaves");
      const filepath = join(keyPath, "public_key.pem");

      const publicKey = fs.readFileSync(filepath, "utf8");

      return this.jwtService.verify(token, {
        secret: publicKey,
        algorithms: ["ES512"],
      });
    } catch (error) {
      throw new UnauthorizedException(
        this.i18n.t("events.commons.invalidToken"),
      );
    }
  }
  //#endregion
}
