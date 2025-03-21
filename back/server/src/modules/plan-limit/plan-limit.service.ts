import { Injectable } from "@nestjs/common";
import { CreatePlanLimitDto } from "./dto/create-plan-limit.dto";
import { UpdatePlanLimitDto } from "./dto/update-plan-limit.dto";

@Injectable()
export class PlanLimitService {
  create(createPlanLimitDto: CreatePlanLimitDto) {
    return "This action adds a new planLimit";
  }

  findAll() {
    return `This action returns all planLimit`;
  }

  findOne(id: number) {
    return `This action returns a #${id} planLimit`;
  }

  update(id: number, updatePlanLimitDto: UpdatePlanLimitDto) {
    return `This action updates a #${id} planLimit`;
  }

  remove(id: number) {
    return `This action removes a #${id} planLimit`;
  }
}
