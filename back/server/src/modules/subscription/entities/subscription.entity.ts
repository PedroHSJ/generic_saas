import { NutritionistEntity } from "src/modules/nutritionist/entities/nutritionist.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_SUBSCRIPTIONS")
export class SubscriptionEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => NutritionistEntity)
  @JoinColumn({ name: "nutritionist_id" })
  nutritionist: NutritionistEntity;

  @Column({
    name: "stripe_subscription_id",
    length: 255,
    nullable: false,
    unique: true,
  })
  stripeSubscriptionId: string;

  @Column({
    name: "plan",
    type: "enum",
    enum: ["BASIC", "PRO"],
    nullable: false,
  })
  plan: string;

  @Column({
    name: "status",
    type: "enum",
    enum: ["TRIAL", "ACTIVE", "INACTIVE"],
    nullable: false,
  })
  status: string;

  @Column({
    name: "current_period_end",
    type: "timestamp",
    nullable: false,
  })
  currentPeriodEnd: Date;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
