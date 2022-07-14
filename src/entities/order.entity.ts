import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Orders {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    product_id: string

    @Column()
    user_id: string

    @Column()
    quantity: number

    @Column()
    type: string

    @Column()
    active: boolean
    
}