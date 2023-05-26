import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity {
   @PrimaryGeneratedColumn()
    public id: number; 

   @Column()
    public email :string;

   @Column()
    public password :string;

    @Column()
    public salt : string
}