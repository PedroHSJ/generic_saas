import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class LoginDto {
  @ApiProperty({
    description: "User email",
    type: "string",
    example: "joago@gmail.com",
  })
  @Transform(({ value }) => value?.trim()?.toLowerCase())
  email: string;

  @ApiProperty({
    description: "User password",
    type: "string",
    example: "123456",
  })
  @Transform(({ value }) => value?.trim())
  password: string;
}
