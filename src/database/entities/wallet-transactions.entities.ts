import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TransactionStatus } from "../enums/enums.database";
import Wallet from "./wallet.entities";



@Entity()
class WalletTransaction {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'int'})
    amount!: number

    @Column({ type: 'varchar'})
    transactionReference!: string

    @Column({ type: 'varchar'})
    reason!: string

    @Column({ type: 'varchar'})
    amountSlug!: string

    @Column({type: 'enum', enum: TransactionStatus, default: TransactionStatus.pending})
    status!: TransactionStatus
    
    @ManyToOne(() => Wallet, wallet => wallet.walletTransactions, { cascade: true})
    wallet!: Wallet

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default WalletTransaction