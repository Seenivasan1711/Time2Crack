"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddProductStatusAndType1710000000001 = void 0;
class AddProductStatusAndType1710000000001 {
    constructor() {
        this.name = 'AddProductStatusAndType1710000000001';
    }
    async up(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "products" 
      ADD COLUMN "status" VARCHAR(50) DEFAULT 'active',
      ADD COLUMN "type" VARCHAR(50) DEFAULT 'physical'
    `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
      ALTER TABLE "products" 
      DROP COLUMN "status",
      DROP COLUMN "type"
    `);
    }
}
exports.AddProductStatusAndType1710000000001 = AddProductStatusAndType1710000000001;
//# sourceMappingURL=1710000000001-AddProductStatusAndType.js.map