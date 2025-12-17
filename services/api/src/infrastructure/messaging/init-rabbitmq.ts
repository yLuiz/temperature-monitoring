import { SensorRepositoryInstance } from "../database/postgres/repositories/sensor.repository";
import { connectRabbitMQ, setupRabbitMQChannel } from "./rabbitmq";
import { publishSensorListUpdated } from "./publishers/publishSensorListUpdated";
import { runRabbitMQConsumers } from "./consumers/run-rabbitmq-consumers";

export async function initRabbitMQ() {
  await connectRabbitMQ();
  await setupRabbitMQChannel();

  await runRabbitMQConsumers();

  /* 
  //  Teste de envio de sensors readings via RabbitMQ
  //  */
  const sensorsToSend = await SensorRepositoryInstance.getAll();
  await publishSensorListUpdated(sensorsToSend);

}