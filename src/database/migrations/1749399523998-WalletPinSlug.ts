import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletPinSlug1749399523998 implements MigrationInterface {
    name = 'WalletPinSlug1749399523998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "amountSlug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "walletPin" character varying NOT NULL DEFAULT '0000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "walletPin"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "amountSlug"`);
    }

}
