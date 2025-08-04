import { MigrationInterface, QueryRunner } from "typeorm";
export declare class AddProductStatusAndType1754282306905 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
