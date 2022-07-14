import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('permissions')
export class Permissions {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({unique: true, length: 25})
    name: string

}