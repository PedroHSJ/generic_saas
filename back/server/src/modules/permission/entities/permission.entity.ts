import { FeatureEntity } from "src/modules/feature/entities/feature.entity";
import { RoleEntity } from "src/modules/role/entities/role.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_PERMISSIONS")
export class PermissionEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: "role_id" })
  role: RoleEntity;

  @ManyToOne(() => FeatureEntity)
  @JoinColumn({ name: "feature_id" })
  feature: FeatureEntity;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
