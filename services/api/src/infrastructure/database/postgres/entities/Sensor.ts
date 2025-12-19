import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import { Alert } from "./Alert";
import { SensorReading } from "./SensorReadings";

@Entity("sensors")
export class Sensor {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        unique: true,
        nullable: false,
        type: "varchar"
    })
    sensor_code!: string;

    @Column({
        nullable: false,
        type: "varchar"
    })
    name!: string;

    @Column({
        nullable: false,
        type: "float",
        default: 0
    })
    max_humidity!: number;

    @Column({
        nullable: false,
        type: "float",
        default: 0
    })
    min_humidity!: number;

    @Column({
        nullable: false,
        type: "float",
        default: 0
    })
    max_temperature!: number;

    @Column({
        nullable: false,
        type: "float",
        default: 0
    })
    min_temperature!: number;

    @OneToMany(() => SensorReading, reading => reading.sensor)
    readings!: SensorReading[];

    @OneToMany(() => Alert, alert => alert.sensor)
    alerts!: Alert[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}
