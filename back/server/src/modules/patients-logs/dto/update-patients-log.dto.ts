import { PartialType } from "@nestjs/mapped-types";
import { CreatePatientsLogDto } from "./create-patients-log.dto";

export class UpdatePatientsLogDto extends PartialType(CreatePatientsLogDto) {}
