import { Module } from "@nestjs/common";
import { NutritionistService } from "./nutritionist.service";
import { NutritionistController } from "./nutritionist.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NutritionistEntity } from "./entities/nutritionist.entity";

@Module({
  imports: [TypeOrmModule.forFeature([NutritionistEntity])],
  controllers: [NutritionistController],
  providers: [NutritionistService],
})
export class NutritionistModule {}
