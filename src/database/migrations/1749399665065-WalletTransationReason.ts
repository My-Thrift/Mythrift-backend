import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletTransationReason1749399665065 implements MigrationInterface {
    name = 'WalletTransationReason1749399665065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "reason" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "walletPin" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" ALTER COLUMN "walletPin" SET DEFAULT '0000'`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "reason"`);
    }

}
