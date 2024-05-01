import { Kafka } from "kafkajs";

export const kafkaStream = new Kafka({
    clientId: "create-event-publisher",
    brokers: ["localhost:29092"],
});
  
export const NEW_EVENT_TOPIC = 'new-event'