import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity()
class Refunds {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({type: 'uuid'})
    orderReference!: string

    @Column({ type: 'numeric', nullable: true})
    amountRefunded!: number

    @Column({type: "jsonb", nullable: true})
    additionalInfo: any

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default Refunds