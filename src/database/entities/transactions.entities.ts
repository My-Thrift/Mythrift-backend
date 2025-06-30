import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TransactionStatus, VendorDecision } from '../enums/enums.database'

@Entity()
class Transactions {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'varchar'})
    email!: string

    @Column({ type: 'varchar'})
    userId!: string

    @Column({type: 'varchar'})
    firstName!: string

    @Column({type: 'varchar'})
    lastName!: string

    @Column({type: 'varchar'})
    vendorId!: string

    @Column({type: 'varchar'})
    reference!: string

    @Column({type: 'numeric', nullable: true})
    serviceFee!: number

    @Column({ type: 'numeric', precision: 10, nullable: true, default: 0})
    deliveryFee!: number

    @Column({type: 'enum', enum: TransactionStatus, default: TransactionStatus.pending})
    paymentStatus!: TransactionStatus
  
    @Column({type: 'enum', enum: VendorDecision, default: VendorDecision.pending})
    vendorStatus!: VendorDecision

    @Column({type: 'numeric', nullable: true})
    amount!: number

    @Column({type: 'jsonb'})
    cartItems!: any

    @Column({type: 'varchar', nullable: true})
    note!: string

    @Column({type: 'jsonb', nullable: true})
    userInfo!: any

    @Column({type: 'varchar', nullable: true})
    deliveryInfo!: string

    @Column({type: 'boolean'})
    orderDelivered!: Boolean

    @Column({type: 'boolean'})
    isStockpile!: Boolean

    @Column({type: 'int', nullable: true})
    stockpileDuration!: number

    @Column({type: 'varchar', nullable: true})
    draftToken!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}

export default Transactions