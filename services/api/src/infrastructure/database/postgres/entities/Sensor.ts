import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm";
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
    sensorCode!: string;
    
    @Column({
        nullable: false,
        type: "varchar"
    })
    name!: string;

    @OneToMany(() => SensorReading, reading => reading.sensor)
    readings!: SensorReading[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}
