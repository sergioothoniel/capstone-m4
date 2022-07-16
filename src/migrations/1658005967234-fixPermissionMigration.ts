import { MigrationInterface, QueryRunner } from "typeorm";

export class fixPermissionMigration1658005967234 implements MigrationInterface {
    name = 'fixPermissionMigration1658005967234'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "inventory" RENAME COLUMN "quantiy" TO "quantity"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "PK_920331560282b8bd21bb02290df"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "permissionId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "permissionId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "permissionId" uuid`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "PK_920331560282b8bd21bb02290df"`);
        await queryRunner.query(`ALTER TABLE "permissions" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD "id" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fba1d16d693fbc4fa7becb96a8e" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "inventory" RENAME COLUMN "quantity" TO "quantiy"`);
    }

}
