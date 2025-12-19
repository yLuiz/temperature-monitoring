import { connectRabbitMQ, setupRabbitMQChannel } from "./rabbitmq";

export async function initRabbitMQ(): Promise<void> {
    await connectRabbitMQ();
    await setupRabbitMQChannel();
}