import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { StockDecreaseLog } from "./stock-decrease-log.entity";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public name!: string;

    @Column()
    public sku!: string
    @Column()
    public stock!: number;


    @Column()
    public price!: number;

    @OneToMany(() => StockDecreaseLog, (stockDecreaseLog) => stockDecreaseLog.product)
    public stockDecreaseLogs : StockDecreaseLog[]

}