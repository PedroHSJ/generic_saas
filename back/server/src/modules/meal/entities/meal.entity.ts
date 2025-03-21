import { DietEntity } from "src/modules/diet/entities/diet.entity";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("TB_MEALS")
export class MealEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @ManyToOne(() => DietEntity)
  @JoinColumn({ name: "diet_id" })
  diet: DietEntity;

  @Column({
    name: "meal_type",
    type: "enum",
    enum: ["BREAKFAST", "LUNCH", "DINNER"],
    nullable: false,
  })
  mealType: string;

  @Column({ name: "description", type: "text", nullable: false })
  description: string;

  @Column({ name: "photo_url", length: 255, nullable: true })
  photoUrl: string;

  @Column({
    name: "created_at",
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @Column({ name: "active", type: "boolean", default: true })
  active: boolean;
}
