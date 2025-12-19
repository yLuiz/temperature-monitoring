import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Sensor } from '../entities/Sensor';

type SensorSeed = Omit<Sensor, "id" | "readings" | "alerts" | "created_at" | "updated_at">;

export class PopulateSensor1765742040816 implements Seeder {
    track = true;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const sensorRepository = dataSource.getRepository(Sensor);
        const sensors: SensorSeed[] = [
            { name: "Sensor 01 - Câmara Fria", sensor_code: "SENSOR_001", min_temperature: 0, max_temperature: 5, min_humidity: 75, max_humidity: 90 },
            { name: "Sensor 02 - Câmara Fria", sensor_code: "SENSOR_002", min_temperature: 0, max_temperature: 4, min_humidity: 80, max_humidity: 95 },

            { name: "Sensor 03 - Freezer", sensor_code: "SENSOR_003", min_temperature: -25, max_temperature: -18, min_humidity: 60, max_humidity: 80 },
            { name: "Sensor 04 - Freezer", sensor_code: "SENSOR_004", min_temperature: -22, max_temperature: -16, min_humidity: 65, max_humidity: 85 },

            { name: "Sensor 05 - Estoque Seco", sensor_code: "SENSOR_005", min_temperature: 18, max_temperature: 25, min_humidity: 40, max_humidity: 60 },
            { name: "Sensor 06 - Estoque Seco", sensor_code: "SENSOR_006", min_temperature: 17, max_temperature: 26, min_humidity: 35, max_humidity: 55 },

            { name: "Sensor 07 - Área de Preparo", sensor_code: "SENSOR_007", min_temperature: 16, max_temperature: 24, min_humidity: 45, max_humidity: 65 },
            { name: "Sensor 08 - Área de Preparo", sensor_code: "SENSOR_008", min_temperature: 17, max_temperature: 23, min_humidity: 50, max_humidity: 70 },

            { name: "Sensor 09 - Recebimento", sensor_code: "SENSOR_009", min_temperature: 15, max_temperature: 28, min_humidity: 50, max_humidity: 75 },

            { name: "Sensor 10 - Expedição", sensor_code: "SENSOR_010", min_temperature: 18, max_temperature: 30, min_humidity: 45, max_humidity: 70 },

            { name: "Sensor 11 - Área de Higienização", sensor_code: "SENSOR_011", min_temperature: 18, max_temperature: 26, min_humidity: 60, max_humidity: 85 },

            { name: "Sensor 12 - Câmara de Resfriamento Rápido", sensor_code: "SENSOR_012", min_temperature: -2, max_temperature: 2, min_humidity: 70, max_humidity: 90 },

            { name: "Sensor 13 - Padaria", sensor_code: "SENSOR_013", min_temperature: 20, max_temperature: 28, min_humidity: 40, max_humidity: 60 },

            { name: "Sensor 14 - Confeitaria", sensor_code: "SENSOR_014", min_temperature: 18, max_temperature: 24, min_humidity: 45, max_humidity: 65 },

            { name: "Sensor 15 - Laticínios", sensor_code: "SENSOR_015", min_temperature: 2, max_temperature: 6, min_humidity: 80, max_humidity: 95 },

            { name: "Sensor 16 - Açougue", sensor_code: "SENSOR_016", min_temperature: 0, max_temperature: 4, min_humidity: 75, max_humidity: 90 },

            { name: "Sensor 17 - Hortifruti", sensor_code: "SENSOR_017", min_temperature: 4, max_temperature: 10, min_humidity: 85, max_humidity: 95 },

            { name: "Sensor 18 - Armazenamento de Grãos", sensor_code: "SENSOR_018", min_temperature: 15, max_temperature: 22, min_humidity: 35, max_humidity: 55 },

            { name: "Sensor 19 - Câmara de Maturação", sensor_code: "SENSOR_019", min_temperature: 10, max_temperature: 14, min_humidity: 85, max_humidity: 95 },

            { name: "Sensor 20 - Área Administrativa", sensor_code: "SENSOR_020", min_temperature: 20, max_temperature: 24, min_humidity: 40, max_humidity: 60 },
        ];


        let sensorsCreated = [];

        for (const sensorData of sensors) {

            const exists = await sensorRepository.findOneBy({ sensor_code: sensorData.sensor_code });
            if (exists) {
                console.log(`⚠️  Sensor with code ${sensorData.sensor_code} already exists. Skipping...`);
                continue;
            }

            const sensor = sensorRepository.create(sensorData);
            const savedSensor = await sensorRepository.save(sensor);
            sensorsCreated.push(savedSensor);
        }

        console.log('📡 Sensors created: ', sensorsCreated);
    }
}
