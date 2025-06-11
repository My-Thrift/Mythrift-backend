import { MigrationInterface, QueryRunner } from "typeorm";

export class WalletTransationMyId1749459132716 implements MigrationInterface {
    name = 'WalletTransationMyId1749459132716'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD "myThriftId" character varying NOT NULL DEFAULT '0000'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP COLUMN "myThriftId"`);
    }

}
