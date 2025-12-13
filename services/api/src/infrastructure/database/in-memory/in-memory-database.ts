export interface ISensor {
    id: string;
    name: string;
}

export interface ISensorReading {
    sensorId: string;
    sensor: ISensor;
    temperature: number;
    humidity: number;
    updatedAt: string;
}

export interface IDatabase {
    sensors: Record<string, ISensor>;
    readings: Record<string, ISensorReading[]>;
}

export interface ISensorRepository {
    getAll(): ISensor[];
    getById(id: string): ISensor | undefined;
    save(sensor: ISensor): void;
}

export interface ISensorReadingRepository {
    getBySensorId(sensorId: string): ISensorReading[];
    save(reading: ISensorReading): void;
}

export class InMemoryDatabase {
    private db: IDatabase = {
        sensors: {},
        readings: {},
    };

    // 🔹 Sensor Repository
    public readonly sensors: ISensorRepository = {
        getAll: () => {
            return Object.values(this.db.sensors);
        },

        getById: (id: string) => {
            return this.db.sensors[id];
        },

        save: (sensor: ISensor) => {
            this.db.sensors[sensor.id] = sensor;
        },
    };

    // 🔹 Sensor Reading Repository
    public readonly readings: ISensorReadingRepository = {
        getBySensorId: (sensorId: string) => {
            return this.db.readings[sensorId] || [];
        },

        save: (reading: ISensorReading) => {

            console.log("Saving reading:", reading);

            if (!this.db.readings[reading.sensorId]) {
                this.db.readings[reading.sensorId] = [];
            }

            const sensor = this.db.sensors[reading.sensorId];
            if (sensor) {
                reading.sensor = sensor;
            }

            this.db.readings[reading.sensorId].push(reading);
        },
    };
}
