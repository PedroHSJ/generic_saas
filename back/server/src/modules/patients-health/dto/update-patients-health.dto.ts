import { PartialType } from "@nestjs/mapped-types";
import { CreatePatientsHealthDto } from "./create-patients-health.dto";

export class UpdatePatientsHealthDto extends PartialType(
  CreatePatientsHealthDto,
) {}
