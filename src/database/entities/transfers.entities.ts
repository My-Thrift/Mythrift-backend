import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
class Transfers {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({type: 'varchar'})
    orderReference!: string

    @Column({ type: "varchar"})
    recipientCode!: string
    
    @Column({type: 'varchar'})
    vendorId!: string

    @Column({type: 'boolean'})
    transactionCompleted!: Boolean

    @Column({type: 'int'})
    amountLeft!: number

    @Column({type: 'varchar'})
    percentagePaid!: string

    @Column({ name: "additionalInfo", type: 'jsonb', nullable: true})
    additionalInfo!: any

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}

export default Transfers