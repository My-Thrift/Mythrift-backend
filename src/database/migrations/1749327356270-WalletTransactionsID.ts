import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletTransactionsID1749327356270 implements MigrationInterface {
    name = 'WalletTransactionsID1749327356270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "PK_62a01b9c3a734b96a08c621b371"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "PK_62a01b9c3a734b96a08c621b371" PRIMARY KEY ("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "PK_62a01b9c3a734b96a08c621b371"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "PK_62a01b9c3a734b96a08c621b371" PRIMARY KEY ("id")`);
    }

}
