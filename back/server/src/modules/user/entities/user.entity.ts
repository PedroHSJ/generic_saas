import { Exclude } from "class-transformer";
import { BaseEntity } from "src/shared/entities/base.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("tb_user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({
    type: "varchar",
    length: 255,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: "varchar",
    length: 14,
    unique: true,
    nullable: true,
  })
  cpf: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  picture: string;

  @Column({ name: "google_login", type: "boolean", default: false })
  isGoogleLogin: boolean;

  @Column({
    type: "varchar",
    length: 255,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({ name: "token", type: "varchar", length: 255 })
  token: string;

  @Column({ name: "token_expiration", type: "timestamp" })
  tokenExpires: Date;
}
