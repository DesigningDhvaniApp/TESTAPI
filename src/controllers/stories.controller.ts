import { createStoryHandler, findAllStories, updateStoryHandler } from "#handlers/stories.handler.ts";
import { IStory } from "#models/Story.ts";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createStoryHandler(req.body as IStory);
    return res.status(StatusCodes.CREATED).json(req.body);
  } catch (error) {
    next(error);
  }
};

export const getAllStories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await findAllStories();
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateStory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const response = await updateStoryHandler(body, id);
    return res.status(StatusCodes.OK).json(response);
  } catch (error) {
    next(error);
  }
};
