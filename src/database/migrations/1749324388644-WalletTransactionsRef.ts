import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletTransactionsRef1749324388644 implements MigrationInterface {
    name = 'WalletTransactionsRef1749324388644'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transactions" ADD "transactionReference" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transactions" DROP COLUMN "transactionReference"`);
    }

}
