import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { Category } from "./category.entity";
import { Inventory } from "./inventory.entity";
import { Order } from "./order.entity";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

@Entity("products")
export class Product {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => User, (user) => user.products)
  user: User;
  @ManyToOne((type) => Category, (category) => category.products)
  category: Category;

  @OneToMany((type) => Inventory, (inventory) => inventory.product, {
    eager: true,
  })
  inventories: Inventory[];
  @OneToMany((type) => Order, (order) => order.product, {
    eager: true,
  })
  orders: Order[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
