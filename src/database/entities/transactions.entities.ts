import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
class Transactions {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'varchar'})
    email!: string

    @Column({type: 'varchar'})
    firstName!: string

    @Column({type: 'varchar'})
    lastName!: string

    @Column({type: 'varchar'})
    vendorId!: string

    @Column({type: 'varchar'})
    reference!: string

    @Column({type: 'varchar'})
    serviceFee!: string

    @Column({type: 'varchar', nullable: true})
    deliveryFee!: string

    @Column({type: 'varchar', default: 'pending'})
    paymentStatus!: string
  
    @Column({type: 'varchar', default: 'pending'})
    vendorStatus!: string

    @Column({type: 'int'})
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