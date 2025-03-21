import { Injectable } from "@nestjs/common";
import { CreatePatientsHealthDto } from "./dto/create-patients-health.dto";
import { UpdatePatientsHealthDto } from "./dto/update-patients-health.dto";

@Injectable()
export class PatientsHealthService {
  create(createPatientsHealthDto: CreatePatientsHealthDto) {
    return "This action adds a new patientsHealth";
  }

  findAll() {
    return `This action returns all patientsHealth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} patientsHealth`;
  }

  update(
    id: number,
    updatePatientsHealthDto: UpdatePatientsHealthDto,
  ) {
    return `This action updates a #${id} patientsHealth`;
  }

  remove(id: number) {
    return `This action removes a #${id} patientsHealth`;
  }
}
