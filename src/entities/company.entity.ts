import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("companies")
export class Company {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  cnpj: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
