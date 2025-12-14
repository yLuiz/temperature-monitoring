import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSensorReadings1765734496826 implements MigrationInterface {

    private readonly _TABLE_NAME = "sensor_readings";

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
                    name: "sensor_id",
                    type: "uuid",
                    isNullable: false
                },
                {
                    name: "temperature",
                    type: "float",
                    isNullable: false
                },
                {
                    name: "humidity",
                    type: "float",
                    isNullable: false
                },
                {
                    name: "recordedAt",
                    type: "timestamp",
                    default: "now()",
                    isNullable: false
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["sensor_id"],
                    referencedTableName: "sensors",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE"
                }
            ]
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this._TABLE_NAME);
    }

}
