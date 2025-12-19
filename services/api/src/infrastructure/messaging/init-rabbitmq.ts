import { EmitSensorDatabaseUpdate } from "../../application/use-cases/sensors/emit-sensor-database-update";
import { runRabbitMQConsumers } from "./consumers/run-rabbitmq-consumers";
import { connectRabbitMQ, setupRabbitMQChannel } from "./rabbitmq";

const emitSensorDatabaseUpdate = new EmitSensorDatabaseUpdate();

export async function initRabbitMQ() {
  await connectRabbitMQ();
  await setupRabbitMQChannel();
  runRabbitMQConsumers();
  emitSensorDatabaseUpdate.execute();
}