import express from "express";
import cors from "cors";
import storyBoardRoutes from "./routes/stories.routes";
import { globalErrorHandler } from "./middleware/globalErrorHandler";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/stories", storyBoardRoutes);

// Global error handler at the end
// app.use(globalErrorHandler);

export default app;
