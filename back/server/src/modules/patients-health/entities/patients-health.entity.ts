import { PatientEntity } from "src/modules/patient/entities/patient.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_PATIENTS_HEALTH")
export class PatientHealthEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => PatientEntity)
  @JoinColumn({ name: "patient_id" })
  patient: PatientEntity;

  @Column({
    name: "weight",
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: false,
  })
  weight: number;

  @Column({
    name: "height",
    type: "decimal",
    precision: 5,
    scale: 2,
    nullable: false,
  })
  height: number;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
