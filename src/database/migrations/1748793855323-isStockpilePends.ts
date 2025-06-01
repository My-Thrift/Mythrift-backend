import { MigrationInterface, QueryRunner } from "typeorm";

export class IsStockpilePends1748793855323 implements MigrationInterface {
    name = 'IsStockpilePends1748793855323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pending_payments" ADD "isStockpile" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pending_payments" DROP COLUMN "isStockpile"`);
    }

}
