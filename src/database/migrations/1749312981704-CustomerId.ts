import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerId1749312981704 implements MigrationInterface {
    name = 'CustomerId1749312981704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "customerCode" TO "customerId"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customerId" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customerId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" RENAME COLUMN "customerId" TO "customerCode"`);
    }

}
