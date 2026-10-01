import { Router } from "express";

import {
  listTickets,
  ticketSummary,
  getTicket,
  addTicket,
  editTicket,
} from "../controllers/ticketController.js";

const router = Router();

// IMPORTANT:
// Summary route must come before /:id.
// Otherwise "summary" could be treated as an ID.
router.get("/summary", ticketSummary);

router.get("/", listTickets);

router.get("/:id", getTicket);

router.post("/", addTicket);

router.patch("/:id", editTicket);

export default router;