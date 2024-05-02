import { Request, Response } from "express";
import { CreateEvent } from "../types";
import { publishEvent } from "../services/publishers/createEvent";

export const createEvent = async (req: Request, res: Response) => {
  //Assumes happy path - needs checking and such
  const event = req.body as CreateEvent;
  console.log(JSON.stringify(event));
  await publishEvent(event);
  res.status(202).send("Event has been recieved");
};


export const getMetrics = async (req: Request, res: Response) => {
    //Get the metrics from the consumer service
    const { accountId } = req.query
    console.log('This is the accountId', accountId)
    res.status(200).send({ counts: {eventTypes: {}, users: 0} })
}
