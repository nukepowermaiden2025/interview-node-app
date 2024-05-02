import { Kafka, Consumer } from "kafkajs";
import { CreateEvent, EventType, EventsSummary } from "../../types";
import { kafkaStream } from "../../kafka";
import { NEW_EVENT_TOPIC } from "../../kafka";

let consumer: Consumer;

let consumedEvents: any = {};

async function getConsumer(kafka: Kafka) {
  if (consumer) {
    return consumer;
  }
  consumer = await kafka.consumer({ groupId: "consumer-new-event-1" });

  return consumer;
}

export async function processEvent() {
  const consumer = await getConsumer(kafkaStream);
  await consumer.connect();
  await consumer.subscribe({
    topics: [NEW_EVENT_TOPIC],
    fromBeginning: true
  });
 

  return await consumer.run({
    eachMessage: async ({ message }) => {
      
      const messageValue = message.value?.toString() as string;
      const { createdAt, eventType, account, user }: Partial<CreateEvent> & {parsedDate: number} =
        JSON.parse(messageValue);
      const key = account as string;
      const parsedDate = Date.parse(createdAt as string)

      if (!consumedEvents[key]) {
        consumedEvents[key] = [];
      }
      
      consumedEvents[key].push({ createdAt, parsedDate, eventType, user });
    },
  });
}

export function getMetricsByAccount(
  accountId: CreateEvent["account"],
  metricsWindowHrs: number
) {
  const currentEvents = consumedEvents[accountId];

  if (!currentEvents) {
    return {eventTypes: {}, users: 0}
  }

  let trackedUsers: string[] = []
  
  let results: EventsSummary = generateResultsResponse();

   //sort decending
  const sortedEvents = currentEvents.sort((a: any, b: any) => {
    return b['parsedDate'] - a['parsedDate']
  })
  const fromDateMilSeconds = getFromDate(metricsWindowHrs)

  for (let i = 0; i < sortedEvents.length; i++) {
    const current = sortedEvents[i]
   
   
    if (current.parsedDate < fromDateMilSeconds) {
      console.log('Already hit the current time')
      return results
    }

    updateUserTracker(trackedUsers, current, results);

    updateEventTypeCounts(current, results);
    
  }

  return results
}

function generateResultsResponse() {
  const initializeTypeCounts = Object.values(EventType).map(etype => {
    return { [etype]: 0 };
  });
  const results = {
    eventTypes: {
      ...Object.assign({}, ...initializeTypeCounts)
    },
    users: 0
  };
  return results;
}

function updateEventTypeCounts(current: any, results: EventsSummary) {
  const typeOptions = Object.values(EventType);
  const currentType = typeOptions.find(etype => {
    return etype === current.eventType;
  }) as EventType;

  results['eventTypes'][currentType] += 1;
}

function updateUserTracker(trackedUsers: string[], current: any, results: EventsSummary) {
  if (trackedUsers.indexOf(current.user) < 0) {
    trackedUsers.push(current.user);
    results.users += 1;
  }
}

function getFromDate(metricsWindow: number) {
  const todayEpoch = Date.now();
  const windowInSeconds = metricsWindow * 60 * 60 * 1000;
  const untilDateInSeconds = todayEpoch - windowInSeconds;
  return untilDateInSeconds
}
