import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id! : number

    @Column()
    public price! : number

    @Column()
    public productId! : number;

    @Column()
    public userId! : number
}