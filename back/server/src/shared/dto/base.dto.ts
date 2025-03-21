import { ApiProperty } from "@nestjs/swagger";

export class BaseDTO {
  @ApiProperty({
    description: "Unique identifier",
    readOnly: true,
  })
  id: number;
}
