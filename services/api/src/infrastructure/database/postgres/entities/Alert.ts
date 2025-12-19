import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { MetricTypeEnum } from "../../../../application/interfaces/alert/sensor-alert.interface";
import { Sensor } from "./Sensor";

@Entity("alerts")
export class Alert {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "uuid",
        nullable: false
    })
    sensor_id!: string;

    @Column({
        type: "enum",
        enum: MetricTypeEnum,
        nullable: false
    })
    type!: MetricTypeEnum;

    @Column({
        type: "float",
        nullable: false
    })
    value!: number;

    @Column({
        type: "float",
        nullable: false
    })
    diff!: number;

    @Column({
        type: "float",
        nullable: false
    })
    limit!: number;

    @Column({
        type: "enum",
        enum: ["MIN", "MAX"],
        nullable: false
    })
    parameter!: "MIN" | "MAX";

    @CreateDateColumn()
    occurred_at!: Date;

    @Column({
        type: "varchar",
        nullable: false
    })
    message!: string;

    @ManyToOne(() => Sensor, sensor => sensor.alerts)
    @JoinColumn({ name: "sensor_id" })
    sensor!: Sensor;
}
