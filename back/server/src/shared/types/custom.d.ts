import { UserEntity } from "../../modules/user/entities/user.entity";

declare module "@nestjs/common" {
  interface Request {
    user?: UserEntity;
  }
}
