import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuid } from "uuid";

@Entity()
export class Company {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  @OneToMany((type) => User, (user) => user.company, {
    eager: true,
  })
  users: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
