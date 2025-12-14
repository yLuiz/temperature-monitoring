import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from "typeorm";
import { Sensor } from "./Sensor";

@Entity("sensor_readings")
export class SensorReading {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({
    type: "float",
    nullable: false
  })
  temperature!: number;

  @Column({
    type: "float",
    nullable: false
  })
  humidity!: number;

  @ManyToOne(() => Sensor, sensor => sensor.readings, {
    onDelete: "CASCADE"
  })
  @JoinColumn({ name: "sensor_id" })
  sensor!: Sensor;

  @Column({
    type: "uuid",
    nullable: false
  })
  sensor_id!: string;

  @CreateDateColumn()
  recordedAt!: Date;
}
