export interface SensorProps {
  id?: string;
  sensorCode: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Sensor {
  private readonly id?: string;
  private sensorCode: string;
  private name: string;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: SensorProps) {
    this.validate(props);

    this.id = props.id;
    this.sensorCode = props.sensorCode;
    this.name = props.name;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }

  getId(): string | undefined {
    return this.id;
  }

  getSensorCode(): string {
    return this.sensorCode;
  }

  getName(): string {
    return this.name;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  rename(newName: string): void {
    if (!newName || newName.trim().length < 3) {
      throw new Error('Sensor name must have at least 3 characters');
    }

    this.name = newName;
    this.touch();
  }

  private touch(): void {
    this.updatedAt = new Date();
  }

  private validate(props: SensorProps): void {
    if (!props.sensorCode || props.sensorCode.trim().length === 0) {
      throw new Error('Sensor code is required');
    }

    if (!props.name || props.name.trim().length === 0) {
      throw new Error('Sensor name is required');
    }
  }
}
