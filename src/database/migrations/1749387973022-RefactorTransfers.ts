import { MigrationInterface, QueryRunner } from "typeorm";

export class RefactorTransfers1749387973022 implements MigrationInterface {
    name = 'RefactorTransfers1749387973022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfers" DROP COLUMN "transactionCompleted"`);
        await queryRunner.query(`ALTER TABLE "transfers" DROP COLUMN "amountLeft"`);
        await queryRunner.query(`ALTER TABLE "transfers" DROP COLUMN "percentagePaid"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transfers" ADD "percentagePaid" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD "amountLeft" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transfers" ADD "transactionCompleted" boolean NOT NULL`);
    }

}
