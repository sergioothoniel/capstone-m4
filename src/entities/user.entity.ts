import {
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Permission } from "./permission.entity";
import { Company } from "./company.entity";
import { Order } from "./order.entity";
import { Product } from "./product.entity";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  active: boolean;

  @ManyToOne((type) => Permission)
  permission: Permission;

  @ManyToOne((type) => Company)
  company: Company;

  @OneToMany((type) => Product, (product) => product.user)
  products: Product[];

  @OneToMany((type) => Order, (order) => order.user)
  orders: Order[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
