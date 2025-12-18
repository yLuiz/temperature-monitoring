export interface ISensorInMemory {
    id: string;
    name: string;
    sensorCode: string;
    minTemperature: number;
    maxTemperature: number;
    minHumidity: number;
    maxHumidity: number;
}

export interface ISensorReadingInMemory {
    sensorId: string;
    sensor: ISensorInMemory;
    temperature: number;
    humidity: number;
    updatedAt: string;
}

export interface IDatabase {
    sensors: Record<string, ISensorInMemory>;
    readings: Record<string, ISensorReadingInMemory[]>;
}

export interface ISensorRepository {
    getAll(): ISensorInMemory[];
    getById(id: string): ISensorInMemory | undefined;
    getByCode(sensorCode: string): ISensorInMemory | undefined;
    save(sensor: ISensorInMemory): void;
}

export interface ISensorReadingRepository {
    getBySensorId(sensorId: string): ISensorReadingInMemory[];
    save(reading: ISensorReadingInMemory): void;
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

        getByCode: (sensorCode: string) => {
            return Object.values(this.db.sensors).find(
                (sensor) => sensor.sensorCode === sensorCode
            );
        },

        getById: (id: string) => {
            return this.db.sensors[id];
        },

        save: (sensor: ISensorInMemory) => {
            this.db.sensors[sensor.id] = sensor;
        },
    };

    // 🔹 Sensor Reading Repository
    public readonly readings: ISensorReadingRepository = {
        getBySensorId: (sensorId: string) => {
            return this.db.readings[sensorId] || [];
        },

        save: (reading: ISensorReadingInMemory) => {
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
