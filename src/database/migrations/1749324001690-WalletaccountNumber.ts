import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletaccountNumber1749324001690 implements MigrationInterface {
    name = 'WalletaccountNumber1749324001690'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ADD "walletAccountNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "walletAccountNumber"`);
    }

}
