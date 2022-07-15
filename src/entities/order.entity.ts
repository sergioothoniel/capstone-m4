import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("orders")
export class Order {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  quantity: number;

  @Column()
  type: string;

  @Column()
  active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => Product, {eager: true})
  product: Product;

  @ManyToOne((type) => User, {eager: true})
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
