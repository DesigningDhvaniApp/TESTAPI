import cors from "cors";
import express from "express";

import { globalErrorHandler } from "./middleware/globalErrorHandler";
import storyBoardRoutes from "./routes/stories.routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/stories", storyBoardRoutes);

// Global error handler at the end
app.use(globalErrorHandler);

export default app;
