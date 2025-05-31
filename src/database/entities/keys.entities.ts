import { Column, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

class ApiKey {
    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'text'})
    apiKey!: string

    @CreateDateColumn()
    createdAt!: Date
}

export default ApiKey