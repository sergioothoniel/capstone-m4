import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./products.entity";

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

  @ManyToOne((type) => Products, (product) => product.id)
  product: Products;

  @Column("float")
  total: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
