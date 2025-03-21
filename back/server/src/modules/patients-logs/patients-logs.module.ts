import { Module } from "@nestjs/common";
import { PatientsLogsService } from "./patients-logs.service";
import { PatientsLogsController } from "./patients-logs.controller";

@Module({
  controllers: [PatientsLogsController],
  providers: [PatientsLogsService],
})
export class PatientsLogsModule {}
