import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";

@Entity("inventory")
export class Inventory {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  unitary_value: number;

  @Column({ nullable: true })
  total_value: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Product, {eager: true})
  product: Product;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
