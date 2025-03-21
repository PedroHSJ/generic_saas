import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MaxLength,
  MinLength,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateNutritionistDto {
  @ApiProperty({
    description: "Name of the nutritionist",
    example: "John Doe",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: "Email of the nutritionist",
    example: "john.doe@example.com",
  })
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  @Transform(({ value }) => value.trim().toLowerCase())
  email: string;

  @ApiProperty({
    description: "Password of the nutritionist",
    example: "StrongPassword123!",
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(255)
  password: string;

  @ApiProperty({
    description: "Registration number of the nutritionist (CRN)",
    example: "123456",
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  @Transform(({ value }) => value.trim())
  crn: string;
}
