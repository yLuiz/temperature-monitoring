import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

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
                    name: "recorded_at",
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


        // índice simples por sensor_id
        await queryRunner.createIndex(
            this._TABLE_NAME,
            new TableIndex({
                name: "IDX_SENSOR_READINGS_SENSOR_ID",
                columnNames: ["sensor_id"]
            })
        );

        // índice composto (sensor_id, recorded_at)
        await queryRunner.createIndex(
            this._TABLE_NAME,
            new TableIndex({
                name: "IDX_SENSOR_READINGS_SENSOR_ID_RECORDED_AT",
                columnNames: ["sensor_id", "recorded_at"]
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropIndex(
            this._TABLE_NAME,
            "IDX_SENSOR_READINGS_SENSOR_ID_RECORDED_AT"
        );

        await queryRunner.dropIndex(
            this._TABLE_NAME,
            "IDX_SENSOR_READINGS_SENSOR_ID"
        );


        await queryRunner.dropTable(this._TABLE_NAME);
    }

}
