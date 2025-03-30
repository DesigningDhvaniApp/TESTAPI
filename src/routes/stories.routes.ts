import { createStory, getAllStories, updateStory } from "#controllers/stories.controller.ts";
import { Router } from "express";

import asyncHandler from "./asyncHanlder";
const router = Router();

router.post("/", asyncHandler(createStory));
router.get("/", asyncHandler(getAllStories));
router.put("/:id", asyncHandler(updateStory));

export default router;
