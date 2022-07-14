import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity.ts";

@Entity()
export class Inventory {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  quantiy: number;

  @Column()
  unitary_value: number;

  @Column()
  total_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Product, (product) => product.inventory)
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
