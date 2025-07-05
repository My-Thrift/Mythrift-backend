import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1751709447843 implements MigrationInterface {
    name = 'InitSchema1751709447843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."transactions_paymentstatus_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_vendorstatus_enum" AS ENUM('accepted', 'declined', 'pending')`);
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "userId" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "vendorId" character varying NOT NULL, "reference" character varying NOT NULL, "serviceFee" numeric NOT NULL, "deliveryFee" numeric(10) NOT NULL DEFAULT '0', "paymentStatus" "public"."transactions_paymentstatus_enum" NOT NULL DEFAULT 'pending', "vendorStatus" "public"."transactions_vendorstatus_enum" NOT NULL DEFAULT 'pending', "amount" numeric NOT NULL, "cartItems" jsonb NOT NULL, "note" character varying, "userInfo" jsonb, "deliveryInfo" character varying, "orderDelivered" boolean NOT NULL, "isStockpile" boolean NOT NULL, "stockpileDuration" integer, "draftToken" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pending_payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderReference" character varying NOT NULL DEFAULT 'reference', "vendorId" character varying NOT NULL, "paymentCompleted" boolean NOT NULL DEFAULT false, "percentagePaid" character varying NOT NULL DEFAULT '0', "orderDelivered" boolean NOT NULL DEFAULT false, "isStockpile" boolean NOT NULL DEFAULT false, "vendorAccepted" TIMESTAMP NOT NULL, "vendorPayDate" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_39872aa6dc89244a65774abb7b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refunds" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderReference" uuid NOT NULL, "amountRefunded" numeric NOT NULL, "additionalInfo" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5106efb01eeda7e49a78b869738" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "transfers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "orderReference" character varying NOT NULL, "recipientCode" character varying NOT NULL, "vendorId" character varying NOT NULL, "additionalInfo" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f712e908b465e0085b4408cabc3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "recipients" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "recipientCode" character varying NOT NULL, "vendorId" character varying NOT NULL, "accountNumber" character varying NOT NULL, "additionalInfo" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de8fc5a9c364568f294798fe1e9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "customer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "myThriftId" character varying NOT NULL, "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "customerId" integer NOT NULL, "customerData" jsonb NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "walletId" uuid, CONSTRAINT "REL_d760f4f58e84910b3e1220ef5a" UNIQUE ("walletId"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wallet_transaction_status_enum" AS ENUM('pending', 'success', 'failed')`);
        await queryRunner.query(`CREATE TABLE "wallet_transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "amount" numeric NOT NULL, "transactionReference" character varying NOT NULL, "myThriftId" character varying NOT NULL, "reason" character varying NOT NULL, "amountSlug" character varying NOT NULL, "status" "public"."wallet_transaction_status_enum" NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "walletId" uuid, CONSTRAINT "PK_62a01b9c3a734b96a08c621b371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "walletId" character varying NOT NULL, "myThriftId" character varying NOT NULL, "balance" numeric NOT NULL, "pendingBalance" numeric NOT NULL, "walletPin" character varying NOT NULL, "accountName" character varying NOT NULL, "accountNumber" character varying NOT NULL, "preferredBank" character varying NOT NULL DEFAULT 'titan-paystack', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_d760f4f58e84910b3e1220ef5a3" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet_transaction" ADD CONSTRAINT "FK_07de5136ba8e92bb97d45b9a7af" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet_transaction" DROP CONSTRAINT "FK_07de5136ba8e92bb97d45b9a7af"`);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_d760f4f58e84910b3e1220ef5a3"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "wallet_transaction"`);
        await queryRunner.query(`DROP TYPE "public"."wallet_transaction_status_enum"`);
        await queryRunner.query(`DROP TABLE "customer"`);
        await queryRunner.query(`DROP TABLE "recipients"`);
        await queryRunner.query(`DROP TABLE "transfers"`);
        await queryRunner.query(`DROP TABLE "refunds"`);
        await queryRunner.query(`DROP TABLE "pending_payments"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_vendorstatus_enum"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_paymentstatus_enum"`);
    }

}
