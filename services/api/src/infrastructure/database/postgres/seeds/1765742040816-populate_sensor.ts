import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Sensor } from '../entities/Sensor';

export class PopulateSensor1765742040816 implements Seeder {
    track = false;

    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const sensorRepository = dataSource.getRepository(Sensor);
        const sensors = [
            { name: "Sensor 1", sensor_code: "SENSOR_001" },
            { name: "Sensor 2", sensor_code: "SENSOR_002" },
            { name: "Sensor 3", sensor_code: "SENSOR_003" },
        ];

        let sensorsCreated = [];

        for (const sensorData of sensors) {
            const sensor = sensorRepository.create(sensorData);
            const savedSensor = await sensorRepository.save(sensor);
            sensorsCreated.push(savedSensor);
        }

        console.log('📡 Sensors created: ', sensorsCreated);
    }
}
