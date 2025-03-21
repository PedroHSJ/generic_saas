import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Expose } from "class-transformer";
import { UserEntity } from "src/modules/user/entities/user.entity";

@Exclude()
export class AuthenticationDTO {
  @ApiProperty({
    description: "Authorization token",
    type: "string",
  })
  @Expose()
  access_token: string;

  @ApiProperty({
    description: "Informações do usuário",
  })
  @Expose()
  info: UserEntity;

  constructor(access_token: string, info: UserEntity) {
    this.access_token = access_token;
    this.info = info;
  }
}
