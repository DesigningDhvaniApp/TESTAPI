import { addComment, createStory, getAllStories, updateStory } from "#controllers/stories.controller";
import { Router } from "express";

import asyncHandler from "./asyncHanlder";
const router = Router();

router.post("/", asyncHandler(createStory));
router.get("/", asyncHandler(getAllStories));
router.put("/:id", asyncHandler(updateStory));
router.post("/:id/comment", asyncHandler(addComment));

export const storyBoardRoutes = router;
