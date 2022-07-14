import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class Products {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    category_id: string

    @Column()
    user_id: string

    
}