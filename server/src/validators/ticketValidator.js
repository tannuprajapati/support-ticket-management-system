import { z } from "zod";

const prioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);

const statusSchema = z.enum([
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
]);

// Validation for creating a new ticket.
export const createTicketSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(120, "Title must be 120 characters or less"),

  description: z
    .string()
    .trim()
    .min(1, "Description is required"),

  customerEmail: z
    .string()
    .trim()
    .email("Please provide a valid email address"),

  priority: prioritySchema.default("MEDIUM"),

  status: statusSchema.default("OPEN"),
});

// Only status and priority can be changed
// from the ticket details page.
export const updateTicketSchema = z.object({
  priority: prioritySchema.optional(),
  status: statusSchema.optional(),
});