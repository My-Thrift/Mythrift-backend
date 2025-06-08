import { MigrationInterface, QueryRunner } from "typeorm";

export class Customerdone1749310302169 implements MigrationInterface {
    name = 'Customerdone1749310302169'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "walletName"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "walletId" uuid`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "UQ_d760f4f58e84910b3e1220ef5a3" UNIQUE ("walletId")`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_d760f4f58e84910b3e1220ef5a3" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_d760f4f58e84910b3e1220ef5a3"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "UQ_d760f4f58e84910b3e1220ef5a3"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "walletId"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "walletName" character varying NOT NULL`);
    }

}
