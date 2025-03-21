import { Injectable } from "@nestjs/common";
import { CreatePatientsLogDto } from "./dto/create-patients-log.dto";
import { UpdatePatientsLogDto } from "./dto/update-patients-log.dto";

@Injectable()
export class PatientsLogsService {
  create(createPatientsLogDto: CreatePatientsLogDto) {
    return "This action adds a new patientsLog";
  }

  findAll() {
    return `This action returns all patientsLogs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientsLog`;
  }

  update(id: number, updatePatientsLogDto: UpdatePatientsLogDto) {
    return `This action updates a #${id} patientsLog`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientsLog`;
  }
}
