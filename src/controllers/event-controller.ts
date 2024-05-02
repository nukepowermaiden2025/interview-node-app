import { Request, Response } from "express";
import { CreateEvent } from "../types";
import { publishEvent } from "../services/publishers/createEvent";
import { getMetricsByAccount } from "../services/consumers/processEvent";
import { EventsSummary } from "../types";

const METRICS_WINDOW_HRS = 24

export const createEvent = async (req: Request, res: Response) => {
  //Assumes happy path - needs checking and such
  const event = req.body as CreateEvent;
  console.log(JSON.stringify(event, null, 2));
  await publishEvent(event);
  res.status(202).send("Event has been recieved");
};


export const getMetrics = async (req: Request, res: Response) => {
  const { accountId } = req.params
  
  const recentMetrics: EventsSummary = getMetricsByAccount(accountId, METRICS_WINDOW_HRS)
  
  res.status(200).send({ counts: recentMetrics })
}
