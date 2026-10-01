import express from "express";
import cors from "cors";

import ticketRoutes from "./routes/ticketRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Support Ticket API is running",
  });
});

// Ticket API
app.use("/api/tickets", ticketRoutes);

// Global error handler
app.use(errorHandler);

export default app;