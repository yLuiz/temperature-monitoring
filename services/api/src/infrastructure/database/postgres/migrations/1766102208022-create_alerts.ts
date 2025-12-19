import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableIndex
} from "typeorm";

export class CreateAlerts1766102208022 implements MigrationInterface {

    private readonly _TABLE_NAME = "alerts";
    private readonly _ENUM_TYPE_NAME = "alerts_type_enum";
    private readonly _ENUM_PARAMETER_NAME = "alerts_parameter_enum";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "${this._ENUM_TYPE_NAME}" AS ENUM ('TEMPERATURE', 'HUMIDITY')`);
        await queryRunner.query(`CREATE TYPE "${this._ENUM_PARAMETER_NAME}" AS ENUM ('MIN', 'MAX')`);

        await queryRunner.createTable(
            new Table({
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
                        name: "type",
                        type: this._ENUM_TYPE_NAME,
                        isNullable: false
                    },
                    {
                        name: "parameter",
                        type: this._ENUM_PARAMETER_NAME,
                        isNullable: false
                    },
                    {
                        name: "value",
                        type: "float",
                        isNullable: false
                    },
                    {
                        name: "limit",
                        type: "float",
                        isNullable: false
                    },
                    {
                        name: "diff",
                        type: "float",
                        isNullable: false
                    },
                    {
                        name: "message",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "occurred_at",
                        type: "timestamp",
                        default: "now()"
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
            })
        );

        /* Índices */
        // Índice composto
        await queryRunner.createIndex(
            this._TABLE_NAME,
            new TableIndex({
                name: "IDX_ALERTS_SENSOR_DATE",
                columnNames: ["sensor_id", "occurred_at"]
            })
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this._TABLE_NAME);
        await queryRunner.query(`DROP TYPE "${this._ENUM_TYPE_NAME}"`);
        await queryRunner.query(`DROP TYPE "${this._ENUM_PARAMETER_NAME}"`);
    }
}
