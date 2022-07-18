import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("permissions")
export class Permission {

  @PrimaryGeneratedColumn("increment")
  readonly id: number;

  @Column({ unique: true })
  name: string;  
  
}
