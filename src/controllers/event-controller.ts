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
