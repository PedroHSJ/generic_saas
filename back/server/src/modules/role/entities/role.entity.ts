import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("TB_ROLES")
export class RoleEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "name", length: 255, nullable: false })
  name: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({
    name: "active",
    type: "boolean",
    default: true,
  })
  active: boolean;
}
