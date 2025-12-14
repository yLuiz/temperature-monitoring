import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSensors1765734466443 implements MigrationInterface {

    private readonly _TABLE_NAME = "sensors";

    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: this._TABLE_NAME,
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "uuid"
                },
                {
                    name: "name",
                    type: "varchar",
                    isNullable: false
                },
                {
                    name: "sensor_code",
                    type: "varchar",
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false
                }
            ]
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this._TABLE_NAME);
    }

}
