import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity()
class Recipients {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({type: 'varchar'})
    name!: string

    @Column({type: 'varchar'})
    recipientCode!: string

    @Column({type: "varchar"})
    accountNumber!: string

    @Column({type: "jsonb", nullable: true})
    additionalInfo!: any

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default Recipients