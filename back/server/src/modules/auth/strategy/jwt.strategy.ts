import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { join } from "path";
import { IJwtPayload } from "src/shared/interfaces/jwtPayload.interface";
import * as fs from "fs";
import { AuthService } from "../auth.service";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtStrategy.getSecretKey(configService),
      // signOptions: {
      //   algorithm: "ES512",
      // },
    });
  }

  async validate(payload: IJwtPayload): Promise<UserEntity> {
    try {
      const { email } = payload;

      const user = await this.authService.findUserWithPassword(email);

      if (!user) {
        throw new UnauthorizedException({
          message: "TESTE",
        });
      }

      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException();
    }
  }

  private static getSecretKey(configService: ConfigService): string {
    const keyPath =
      configService.get<string>("KEY_PATH") ||
      join(__dirname, "../../../chaves");
    const filepath = join(keyPath, "public_key.pem");
    return fs.readFileSync(filepath, "utf8");
  }
}
