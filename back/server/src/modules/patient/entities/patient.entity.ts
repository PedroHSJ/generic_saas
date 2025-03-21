import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("TB_PATIENTS")
export class PatientEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", length: 255, nullable: false })
  name: string;

  @Column({ name: "email", length: 255, nullable: false })
  email: string;

  @Column({ name: "password", length: 255, nullable: false })
  password: string;

  @Column({ name: "phone", length: 20, nullable: false })
  phone: string;

  @Column({ name: "birth_date", type: "date", nullable: false })
  birthDate: Date;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
