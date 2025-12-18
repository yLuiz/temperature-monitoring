import { runRabbitMQConsumers } from "./consumers/run-rabbitmq-consumers";
import { connectRabbitMQ, setupRabbitMQChannel } from "./rabbitmq";

export async function initRabbitMQ() {
  await connectRabbitMQ();
  await setupRabbitMQChannel();
  await runRabbitMQConsumers();
}