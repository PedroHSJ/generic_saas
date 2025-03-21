import { NutritionistEntity } from "src/modules/nutritionist/entities/nutritionist.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_PLAN_LIMITS")
export class PlanLimitEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => NutritionistEntity)
  @JoinColumn({ name: "nutritionist_id" })
  nutritionist: NutritionistEntity;

  @Column({
    name: "plan",
    type: "enum",
    enum: ["BASIC", "PRO"],
    nullable: false,
  })
  plan: string;

  @Column({ name: "max_patients", type: "int", nullable: false })
  maxPatients: number;

  @Column({ name: "patients_count", type: "int", default: 0 })
  patientsCount: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
