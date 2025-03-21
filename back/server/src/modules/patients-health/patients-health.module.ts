import { Module } from "@nestjs/common";
import { PatientsHealthService } from "./patients-health.service";
import { PatientsHealthController } from "./patients-health.controller";

@Module({
  controllers: [PatientsHealthController],
  providers: [PatientsHealthService],
})
export class PatientsHealthModule {}
