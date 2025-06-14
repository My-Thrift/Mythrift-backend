import { MigrationInterface, QueryRunner } from "typeorm";

export class Wallet1749306769076 implements MigrationInterface {
    name = 'Wallet1749306769076'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "myThriftId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "customerId" character varying NOT NULL, "customerData" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wallet_transactions_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "wallet_transactions" ("id" SERIAL NOT NULL, "amount" integer NOT NULL, "status" "public"."wallet_transactions_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "walletId" uuid, CONSTRAINT "PK_5120f131bde2cda940ec1a621db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "walletId" character varying NOT NULL, "myThriftId" character varying NOT NULL, "walletBalance" integer NOT NULL, "walletName" character varying NOT NULL, "walletAccountName" character varying NOT NULL, "preferredBank" character varying NOT NULL DEFAULT 'titan-paystack', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_paymentstatus_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "paymentStatus" "public"."transactions_paymentstatus_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "vendorStatus"`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_vendorstatus_enum" AS ENUM('accepted', 'declined', 'pending')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "vendorStatus" "public"."transactions_vendorstatus_enum" NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "wallet_transactions" ADD CONSTRAINT "FK_8a94d9d61a2b05123710b325fbf" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transactions" DROP CONSTRAINT "FK_8a94d9d61a2b05123710b325fbf"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "vendorStatus"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_vendorstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "vendorStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "paymentStatus"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_paymentstatus_enum"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "paymentStatus" character varying NOT NULL DEFAULT 'pending'`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "wallet_transactions"`);
        await queryRunner.query(`DROP TYPE "public"."wallet_transactions_status_enum"`);
        await queryRunner.query(`DROP TABLE "customer"`);
    }

}
