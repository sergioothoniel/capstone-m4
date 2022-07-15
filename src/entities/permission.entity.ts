import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity("permissions")
export class Permission {

  @PrimaryColumn("uuid")
  readonly id: string;

  @Column({ unique: true })
  name: string;  

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
