import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Customer from "./customer.entities";
import walletTransactions from "./wallet-transactions.entities";


@Entity()
class Wallet {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({type: 'varchar'})
    walletId!: string

    @Column({type: 'varchar'})
    myThriftId!: string

    @Column({type: 'numeric'})
    balance!: number

    @Column({type: 'numeric'})
    pendingBalance!: number

    @Column({type: 'varchar'})
    walletPin!: string

    @Column({type: 'varchar'})
    accountName!: string

    @Column({type: 'varchar'})
    accountNumber!: string

    @Column({type: 'varchar', default: 'titan-paystack'})
    preferredBank!: string

    @OneToMany(()=> walletTransactions, transactions => transactions.wallet, { nullable: true})
    @JoinColumn()
    walletTransactions!: walletTransactions

    @OneToOne(()=> Customer, customer=> customer.wallet, { cascade: true})
    customer!: Customer

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}

export default Wallet