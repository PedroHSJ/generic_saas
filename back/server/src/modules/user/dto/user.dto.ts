import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
  IsBoolean,
  Matches,
  IsOptional,
} from "class-validator";
import { Exclude, Expose, Transform } from "class-transformer";
import { BaseDTO } from "src/shared/dto/base.dto";

@Expose()
export class UserDto extends BaseDTO {
  @ApiProperty({
    description: "Name of the user",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: "Email of the user",
    example: "john.doe@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({
    description: "CPF of the user",
    example: "123.456.789-00",
  })
  @IsString()
  @IsOptional()
  @MaxLength(11)
  @MinLength(11)
  @Transform(({ value }) => value?.trim())
  cpf?: string;

  @ApiProperty({
    description: "Picture of the user",
    example: "https://example.com/picture.jpg",
  })
  @IsString()
  @IsOptional()
  picture: string;

  @Exclude()
  isGoogleLogin: boolean;

  @ApiProperty({
    description: "Status of the user",
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;

  @Exclude()
  password: string;
}
