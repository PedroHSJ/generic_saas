import { IsString, IsNotEmpty, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  name: string;
}
