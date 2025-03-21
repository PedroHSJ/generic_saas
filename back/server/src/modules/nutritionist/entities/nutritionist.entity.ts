import { BaseEntity } from "src/shared/entities/base.entity";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tb_nutritionist")
export class NutritionistEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", length: 255, nullable: false })
  name: string;

  @Column({ name: "email", length: 255, nullable: false })
  email: string;

  @Column({ name: "password", length: 255, nullable: false })
  password: string;

  @Column({ name: "crn", length: 20, nullable: false })
  crn: string;
}
