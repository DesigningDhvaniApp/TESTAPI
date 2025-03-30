import { Router } from "express";
import { createStory, getAllStories, updateStory } from "../controllers/stories.controller";
const router = Router();

router.post("/", createStory);
router.get("/", getAllStories);
router.put("/:id", updateStory);

export default router;
