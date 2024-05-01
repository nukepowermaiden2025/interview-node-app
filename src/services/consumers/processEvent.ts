import { Kafka, Consumer } from "kafkajs";
import { CreateEvent } from "../../types";
import { kafkaStream } from "../../kafka";
import { NEW_EVENT_TOPIC } from "../../kafka";


let consumer: Consumer


async function getConsumer(kafka: Kafka) {
  if (consumer) {
    return consumer;
  }
  consumer = await kafka.consumer({ groupId: 'consumer-new-event-1' });

  return consumer;
}


export async function processEvent() {
    const consumer = await getConsumer(kafkaStream)
  await consumer.connect()
  await consumer.subscribe({
    topics: [NEW_EVENT_TOPIC]
  })
    console.log(`This is the consumer ${JSON.stringify(consumer)}`)
    
   return await consumer.run({
    eachMessage: async ({ message }) => {
      console.log('DDDDDDDDDDDDD CONSUMER')
      console.log({
        value: message.value?.toString()
      })
    }
    })


}

