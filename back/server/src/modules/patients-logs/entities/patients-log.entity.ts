import { MealEntity } from "src/modules/meal/entities/meal.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_PATIENT_LOGS")
export class PatientLogEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => MealEntity)
  @JoinColumn({ name: "meal_id" })
  meal: MealEntity;

  @Column({ name: "logged_date", type: "date", nullable: false })
  loggedDate: Date;

  @Column({ name: "consumed", type: "boolean", nullable: false })
  consumed: boolean;

  @Column({ name: "notes", type: "text", nullable: true })
  notes: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
