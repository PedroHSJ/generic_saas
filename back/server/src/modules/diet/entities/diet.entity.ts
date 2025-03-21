import { NutritionistEntity } from "src/modules/nutritionist/entities/nutritionist.entity";
import { PatientEntity } from "src/modules/patient/entities/patient.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_DIETS")
export class DietEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: "patient_id" })
  patient: PatientEntity;

  @ManyToOne(() => NutritionistEntity)
  @JoinColumn({ name: "nutritionist_id" })
  nutritionist: NutritionistEntity;

  @Column({ name: "title", length: 255, nullable: false })
  title: string;

  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "durantion_days", type: "int", nullable: false })
  durationDays: number;

  @Column({
    name: "daily_calories",
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: false,
  })
  dailyCalories: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
