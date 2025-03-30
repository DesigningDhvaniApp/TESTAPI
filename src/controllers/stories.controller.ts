import { NextFunction, Request, Response } from "express";
import { createStoryHandler, findAllStories, updateStoryHandler } from "../handlers/stories.handler";
import { StatusCodes } from "http-status-codes";
import { IStory } from "../models/Story";

export const createStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await createStoryHandler(req.body as IStory);
    console.log("response", response)
    return res.status(StatusCodes.CREATED).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAllStories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await findAllStories();
    return res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

export const updateStory = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id
    const body = req.body
    const response = await updateStoryHandler(body, id);
    return res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

