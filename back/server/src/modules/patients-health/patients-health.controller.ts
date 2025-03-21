import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PatientsHealthService } from "./patients-health.service";
import { CreatePatientsHealthDto } from "./dto/create-patients-health.dto";
import { UpdatePatientsHealthDto } from "./dto/update-patients-health.dto";

@Controller("patients-health")
export class PatientsHealthController {
  constructor(
    private readonly patientsHealthService: PatientsHealthService,
  ) {}

  @Post()
  create(@Body() createPatientsHealthDto: CreatePatientsHealthDto) {
    return this.patientsHealthService.create(createPatientsHealthDto);
  }

  @Get()
  findAll() {
    return this.patientsHealthService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.patientsHealthService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePatientsHealthDto: UpdatePatientsHealthDto,
  ) {
    return this.patientsHealthService.update(
      +id,
      updatePatientsHealthDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.patientsHealthService.remove(+id);
  }
}
