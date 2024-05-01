import { Kafka, Producer } from "kafkajs";
import { CreateEvent } from "../../types";
import { kafkaStream } from "../../kafka";

const TOPIC = "new-event";

let producer: Producer;

async function getProducer(kafka: Kafka) {
  if (producer) {
    return producer;
  }
  producer = await kafka.producer();

  return producer;
}

export async function publishEvent(event: CreateEvent) {
  const producer = await getProducer(kafkaStream);
  await producer.connect();
  console.log(`This is the producer ${JSON.stringify(producer)}`);

  const eventString = JSON.stringify(event);
  return await producer.send({
    topic: TOPIC,
    messages: [
      {
        value: eventString,
      },
    ],
  });
}
