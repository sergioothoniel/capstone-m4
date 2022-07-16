import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Product } from "./product.entity";

@Entity()
export class Category {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  // @OneToMany((type) => Product, (product) => product.category)
  // products: Product[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
