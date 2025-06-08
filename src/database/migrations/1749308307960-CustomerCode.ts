import { MigrationInterface, QueryRunner } from "typeorm";

export class CustomerCode1749308307960 implements MigrationInterface {
    name = 'CustomerCode1749308307960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customerId"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customerCode" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "customerCode"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "customer" ADD "customerId" character varying NOT NULL`);
    }

}
