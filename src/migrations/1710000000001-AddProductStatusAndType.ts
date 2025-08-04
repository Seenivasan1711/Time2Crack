import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductStatusAndType1710000000001 implements MigrationInterface {
  name = 'AddProductStatusAndType1710000000001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products" 
      ADD COLUMN "status" VARCHAR(50) DEFAULT 'active',
      ADD COLUMN "type" VARCHAR(50) DEFAULT 'physical'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "products" 
      DROP COLUMN "status",
      DROP COLUMN "type"
    `);
  }
} 