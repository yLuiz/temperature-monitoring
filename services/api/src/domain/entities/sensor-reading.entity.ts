export interface SensorReadingProps {
  id?: string;
  temperature: number;
  humidity: number;
  sensorId: string;
  recordedAt?: Date;
}

export class SensorReading {
  private readonly id?: string;
  private temperature: number;
  private humidity: number;
  private readonly sensorId: string;
  private readonly recordedAt: Date;

  constructor(props: SensorReadingProps) {
    this.validate(props);

    this.id = props.id;
    this.temperature = props.temperature;
    this.humidity = props.humidity;
    this.sensorId = props.sensorId;
    this.recordedAt = props.recordedAt ?? new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getTemperature(): number {
    return this.temperature;
  }

  getHumidity(): number {
    return this.humidity;
  }

  getSensorId(): string {
    return this.sensorId;
  }

  getRecordedAt(): Date {
    return this.recordedAt;
  }

  updateTemperature(value: number): void {
    if (value < -50 || value > 150) {
      throw new Error('Temperature out of allowed range');
    }
    this.temperature = value;
  }

  updateHumidity(value: number): void {
    if (value < 0 || value > 100) {
      throw new Error('Humidity out of allowed range');
    }
    this.humidity = value;
  }

  private validate(props: SensorReadingProps): void {
    if (props.temperature === undefined || props.temperature === null) {
      throw new Error('Temperature is required');
    }

    if (props.humidity === undefined || props.humidity === null) {
      throw new Error('Humidity is required');
    }

    if (!props.sensorId) {
      throw new Error('SensorId is required');
    }
  }
}
