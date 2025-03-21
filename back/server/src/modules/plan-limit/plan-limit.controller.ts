import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PlanLimitService } from "./plan-limit.service";
import { CreatePlanLimitDto } from "./dto/create-plan-limit.dto";
import { UpdatePlanLimitDto } from "./dto/update-plan-limit.dto";

@Controller("plan-limit")
export class PlanLimitController {
  constructor(private readonly planLimitService: PlanLimitService) {}

  @Post()
  create(@Body() createPlanLimitDto: CreatePlanLimitDto) {
    return this.planLimitService.create(createPlanLimitDto);
  }

  @Get()
  findAll() {
    return this.planLimitService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.planLimitService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePlanLimitDto: UpdatePlanLimitDto,
  ) {
    return this.planLimitService.update(+id, updatePlanLimitDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.planLimitService.remove(+id);
  }
}
