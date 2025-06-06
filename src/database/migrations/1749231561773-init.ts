import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1749231561773 implements MigrationInterface {
    name = 'Init1749231561773'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "vendorId" character varying NOT NULL, "reference" character varying NOT NULL, "serviceFee" integer NOT NULL, "deliveryFee" integer, "paymentStatus" character varying NOT NULL DEFAULT 'pending', "vendorStatus" character varying NOT NULL DEFAULT 'pending', "amount" integer NOT NULL, "cartItems" jsonb NOT NULL, "note" character varying, "userInfo" jsonb, "deliveryInfo" character varying, "orderDelivered" boolean NOT NULL, "isStockpile" boolean NOT NULL, "stockpileDuration" integer, "draftToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pending_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderReference" character varying NOT NULL DEFAULT 'reference', "vendorId" character varying NOT NULL, "paymentCompleted" boolean NOT NULL DEFAULT false, "percentagePaid" character varying NOT NULL DEFAULT '0', "orderDelivered" boolean NOT NULL DEFAULT false, "isStockpile" boolean NOT NULL DEFAULT false, "vendorAccepted" TIMESTAMP NOT NULL, "vendorPayDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39872aa6dc89244a65774abb7b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refunds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderReference" uuid NOT NULL, "amountRefunded" integer NOT NULL, "additionalInfo" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5106efb01eeda7e49a78b869738" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderReference" character varying NOT NULL, "recipientCode" character varying NOT NULL, "vendorId" character varying NOT NULL, "transactionCompleted" boolean NOT NULL, "amountLeft" integer NOT NULL, "percentagePaid" character varying NOT NULL, "additionalInfo" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f712e908b465e0085b4408cabc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "recipientCode" character varying NOT NULL, "vendorId" character varying NOT NULL, "accountNumber" character varying NOT NULL, "additionalInfo" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de8fc5a9c364568f294798fe1e9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "recipients"`);
        await queryRunner.query(`DROP TABLE "transfers"`);
        await queryRunner.query(`DROP TABLE "refunds"`);
        await queryRunner.query(`DROP TABLE "pending_payments"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
