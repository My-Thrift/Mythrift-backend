import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Wallet from "./wallet.entities";

@Entity()
class Customer {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({type: 'varchar'})
    myThriftId!: string

    @Column({type: 'varchar'})
    email!: string

    @Column({type: 'varchar'})
    firstName!: string

    @Column({type: 'varchar'})
    lastName!: string

    @Column({type: 'varchar'})
    phoneNumber!: string

    @Column({type: 'int'})
    customerId!: number

    @Column({type: 'jsonb'})
    customerData!: string

    @OneToOne(()=> Wallet, wallet => wallet.customer)
    @JoinColumn()
    wallet!: Wallet

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default Customer