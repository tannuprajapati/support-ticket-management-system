import prisma from "../lib/prisma.js";

/**
 * Get tickets with search, filters, sorting and pagination.
 *
 * All querying happens on the backend as required
 * by the assignment.
 */
export async function getTickets({
  page = 1,
  limit = 10,
  search = "",
  status,
  priority,
  sort = "newest",
}) {
  const skip = (page - 1) * limit;

  const where = {};

  // Search title OR customer email.
  if (search) {
    where.OR = [
      {
        title: {
          contains: search,
        },
      },
      {
        customerEmail: {
          contains: search,
        },
      },
    ];
  }

  // Filter by status.
  if (status) {
    where.status = status;
  }

  // Filter by priority.
  if (priority) {
    where.priority = priority;
  }

  // Newest or oldest first.
  const orderBy = {
    createdAt: sort === "oldest" ? "asc" : "desc",
  };

  const [tickets, total] = await Promise.all([
    prisma.ticket.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),

    prisma.ticket.count({
      where,
    }),
  ]);

  return {
    tickets,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

/**
 * Get one ticket by ID.
 */
export async function getTicketById(id) {
  return prisma.ticket.findUnique({
    where: {
      id,
    },
  });
}

/**
 * Create a new ticket.
 */
export async function createTicket(data) {
  return prisma.ticket.create({
    data,
  });
}

/**
 * Update ticket status and/or priority.
 */
export async function updateTicket(id, data) {
  return prisma.ticket.update({
    where: {
      id,
    },
    data,
  });
}

/**
 * Get summary counts from the ENTIRE dataset.
 *
 * Notice that there are no search/filter conditions here.
 */
export async function getTicketSummary() {
  const [total, open, inProgress, resolved] = await Promise.all([
    prisma.ticket.count(),

    prisma.ticket.count({
      where: {
        status: "OPEN",
      },
    }),

    prisma.ticket.count({
      where: {
        status: "IN_PROGRESS",
      },
    }),

    prisma.ticket.count({
      where: {
        status: "RESOLVED",
      },
    }),
  ]);

  return {
    total,
    open,
    inProgress,
    resolved,
  };
}