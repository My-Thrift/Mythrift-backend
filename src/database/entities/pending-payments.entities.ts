import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity('pending_payments')
class PendingPayments {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({type: "varchar", default: 'reference'})
    orderReference!: string

    @Column({type: "varchar"})
    vendorId!: string

    @Column({type: 'boolean', default: false})
    paymentCompleted!: Boolean

    @Column({type: "varchar", default: '0'})
    percentagePaid!: string

    @Column({type: "boolean", default: false})
    orderDelivered!: Boolean

    @Column({type: "boolean", default: false})
    isStockpile!: Boolean

    @Column({type: "timestamp"})
    vendorAccepted!: Date

    @Column({type: "timestamp"})
    vendorPayDate!: Date

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default PendingPayments