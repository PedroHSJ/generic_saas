import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientsLogsService } from "./patients-logs.service";
import { CreatePatientsLogDto } from "./dto/create-patients-log.dto";
import { UpdatePatientsLogDto } from "./dto/update-patients-log.dto";

@Controller("patients-logs")
export class PatientsLogsController {
  constructor(private readonly patientsLogsService: PatientsLogsService) {}

  @Post()
  create(@Body() createPatientsLogDto: CreatePatientsLogDto) {
    return this.patientsLogsService.create(createPatientsLogDto);
  }

  @Get()
  findAll() {
    return this.patientsLogsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsLogsService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePatientsLogDto: UpdatePatientsLogDto,
  ) {
    return this.patientsLogsService.update(+id, updatePatientsLogDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsLogsService.remove(+id);
  }
}
