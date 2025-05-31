import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

class BankCode {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'text'})
    bankCode!: string

    @Column({ type: 'text'})
    bankName!: string

    @CreateDateColumn()
    createdAt!: Date
}

export default BankCode