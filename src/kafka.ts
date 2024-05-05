import { Kafka } from "kafkajs";

export const kafkaStream = new Kafka({
    clientId: "create-event-publisher",
    brokers: ["host.docker.internal:29092"],
});
  
export const NEW_EVENT_TOPIC = 'new-event'