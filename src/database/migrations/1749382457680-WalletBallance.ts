import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletBallance1749382457680 implements MigrationInterface {
    name = 'WalletBallance1749382457680'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "walletBalance"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "walletAccountName"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "walletAccountNumber"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "balance" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "pendingBalance" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "accountName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "accountNumber" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "accountNumber"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "accountName"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "pendingBalance"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "walletAccountNumber" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "walletAccountName" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "walletBalance" integer NOT NULL`);
    }

}
