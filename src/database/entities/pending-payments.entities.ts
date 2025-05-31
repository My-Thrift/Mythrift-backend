import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
class PendingPayments {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({type: 'boolean', default: false})
    paymentCompleted!: Boolean

    @Column({type: "varchar", default: '0'})
    percentagePaid!: string

    @Column({type: "boolean", default: false})
    orderDelivered!: Boolean

    @Column({type: "date"})
    vendorAccepted!: Date

    @Column({type: "date"})
    vendorPayDate!: Date

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default PendingPayments