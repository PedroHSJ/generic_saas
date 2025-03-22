import {
  Inject,
  Injectable,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { I18nService } from "nestjs-i18n";
import * as bcrypt from "bcrypt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { paginate, Paginated, PaginateQuery } from "nestjs-paginate";
import { UserEntity } from "./entities/user.entity";
import { IObjectResponse } from "src/shared/interfaces/objectResponse.interface";
import { plainToInstance } from "class-transformer";
import { UserDto } from "./dto/user.dto";
import { NotificationService } from "../notification/notification.service";
import * as crypto from "crypto";

@Injectable()
export class UserService {
  constructor(
    @Inject(I18nService)
    private readonly i18n: I18nService,
    @Inject(NotificationService)
    private readonly notificationService: NotificationService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async b64EncodeUnicode(str: string): Promise<string> {
    return Buffer.from(str).toString("base64");
  }

  async b64DecodeUnicode(str: string): Promise<string> {
    return Buffer.from(str, "base64").toString("utf-8");
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async comparePassword(
    newPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }

  async create(
    createUserDto: CreateUserDto,
  ): Promise<IObjectResponse<UserDto>> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [
          { email: createUserDto.email },
          // { cpf: createUserDto.cpf },
        ],
      });
      if (existingUser) {
        throw new ConflictException(
          this.i18n.t("events.commons.alreadyExists"),
        );
      }
      const passwordHash = await this.hashPassword(createUserDto.password);

      const activationToken = await this.b64EncodeUnicode(
        crypto.randomBytes(32).toString("hex"),
      );
      const fiveMinutes = 1000 * 60 * 5;
      const activationExpires = new Date(Date.now() + fiveMinutes);

      const newUser = await this.userRepository.save({
        ...createUserDto,
        password: passwordHash,
        token: createUserDto.isGoogleLogin ? null : activationToken,
        tokenExpires: activationExpires,
        active: createUserDto.isGoogleLogin ? true : false,
      });

      if (!createUserDto.isGoogleLogin) {
        await this.notificationService.sendAccountConfirmationEmail(
          createUserDto.email,
          activationToken,
        );
      }

      return {
        message: await this.i18n.t("events.commons.success"),
        data: plainToInstance(UserDto, createUserDto),
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: PaginateQuery): Promise<Paginated<UserDto>> {
    try {
      const { data, links, meta } = await paginate<UserDto>(
        query,
        this.userRepository,
        {
          sortableColumns: ["name", "email", "cpf"],
        },
      );
      return {
        data: plainToInstance(UserDto, data),
        meta,
        links,
      };
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number): Promise<IObjectResponse<UserDto>> {
    try {
      const user = await this.userRepository.findOneBy({
        id,
      });
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return {
        message: this.i18n.t("events.commons.success"),
        data: plainToInstance(UserDto, user, {
          excludeExtraneousValues: true,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { email },
      });
    } catch (error) {
      throw error;
    }
  }

  async findByEmailWithPassword(email: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { email },
        select: ["id", "email", "password", "isGoogleLogin", "active"],
      });
    } catch (error) {
      throw error;
    }
  }

  async findByCpf(cpf: string): Promise<UserEntity> {
    try {
      return this.userRepository.findOne({
        where: { cpf },
      });
    } catch (error) {
      throw error;
    }
  }

  async activateUser(
    activationToken: string,
  ): Promise<IObjectResponse<UserDto>> {
    try {
      const user = await this.userRepository.findOne({
        where: { token: activationToken },
      });
      if (!user)
        throw new NotFoundException(this.i18n.t("events.commons.notFound"));

      if (user.tokenExpires < new Date())
        throw new ConflictException(this.i18n.t("events.commons.expiredToken"));

      user.active = true;
      user.token = null;
      user.tokenExpires = null;
      await this.userRepository.save(user);
      return {
        message: this.i18n.t("events.commons.success"),
        data: plainToInstance(UserDto, user),
      };
    } catch (error) {
      throw error;
    }
  }

  async resendAccountConfirmationEmail(
    email: string,
  ): Promise<IObjectResponse<null>> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user)
        throw new NotFoundException(this.i18n.t("events.commons.notFound"));
      if (user?.active)
        throw new ConflictException(
          this.i18n.t("events.commons.alreadyActive"),
        );

      const activationToken = await this.b64EncodeUnicode(
        crypto.randomBytes(32).toString("hex"),
      );
      const fiveMinutes = 1000 * 60 * 5;
      const activationExpires = new Date(Date.now() + fiveMinutes);

      user.token = activationToken;
      user.tokenExpires = activationExpires;
      await this.userRepository.save(user);

      await this.notificationService.sendAccountConfirmationEmail(
        email,
        activationToken,
      );
      return {
        message: this.i18n.t("events.commons.success"),
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  async sendForgotPasswordEmail(email: string): Promise<IObjectResponse<null>> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      if (!user)
        throw new NotFoundException(this.i18n.t("events.commons.notFound"));

      if (!user.active)
        throw new ConflictException(this.i18n.t("events.commons.notActive"));

      const resetToken = await this.b64EncodeUnicode(
        crypto.randomBytes(32).toString("hex"),
      );
      const fiveMinutes = 1000 * 60 * 5;
      const resetExpires = new Date(Date.now() + fiveMinutes);

      user.token = resetToken;
      user.tokenExpires = resetExpires;
      await this.userRepository.save(user);

      await this.notificationService.sendForgotPasswordEmail(email, resetToken);
      return {
        message: this.i18n.t("events.commons.success"),
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }

  async resetPassword(
    resetToken: string,
    password: string,
  ): Promise<IObjectResponse<null>> {
    try {
      const user = await this.userRepository.findOne({
        where: { token: resetToken },
        select: ["id", "token", "tokenExpires", "password"],
      });
      if (!user)
        throw new NotFoundException(this.i18n.t("events.commons.notFound"));

      if (user.tokenExpires < new Date())
        throw new ConflictException(this.i18n.t("events.commons.expiredToken"));

      user.password = await this.hashPassword(password);
      user.token = null;
      user.tokenExpires = null;
      await this.userRepository.save(user);
      return {
        message: this.i18n.t("events.commons.success"),
        data: null,
      };
    } catch (error) {
      throw error;
    }
  }
}
