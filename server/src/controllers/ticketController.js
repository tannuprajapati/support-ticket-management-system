import {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  getTicketSummary,
} from "../services/ticketService.js";

import {
  createTicketSchema,
  updateTicketSchema,
} from "../validators/ticketValidator.js";

/**
 * GET /api/tickets
 */
export async function listTickets(req, res, next) {
  try {
    const page = Math.max(
      Number.parseInt(req.query.page) || 1,
      1
    );

    const limit = Math.min(
      Math.max(
        Number.parseInt(req.query.limit) || 10,
        1
      ),
      50
    );

    const search = req.query.search?.trim() || "";

    const status = req.query.status || undefined;

    const priority = req.query.priority || undefined;

    const sort =
      req.query.sort === "oldest"
        ? "oldest"
        : "newest";

    const result = await getTickets({
      page,
      limit,
      search,
      status,
      priority,
      sort,
    });

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/tickets/summary
 */
export async function ticketSummary(req, res, next) {
  try {
    const summary = await getTicketSummary();

    res.status(200).json({
      success: true,
      data: summary,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/tickets/:id
 */
export async function getTicket(req, res, next) {
  try {
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    const ticket = await getTicketById(id);

    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    res.status(200).json({
      success: true,
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * POST /api/tickets
 */
export async function addTicket(req, res, next) {
  try {
    const validation = createTicketSchema.safeParse(
      req.body
    );

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const ticket = await createTicket(
      validation.data
    );

    res.status(201).json({
      success: true,
      message: "Ticket created successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}

/**
 * PATCH /api/tickets/:id
 */
export async function editTicket(req, res, next) {
  try {
    const id = Number.parseInt(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ticket ID",
      });
    }

    const validation = updateTicketSchema.safeParse(
      req.body
    );

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.error.flatten().fieldErrors,
      });
    }

    const existingTicket = await getTicketById(id);

    if (!existingTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    const ticket = await updateTicket(
      id,
      validation.data
    );

    res.status(200).json({
      success: true,
      message: "Ticket updated successfully",
      data: ticket,
    });
  } catch (error) {
    next(error);
  }
}