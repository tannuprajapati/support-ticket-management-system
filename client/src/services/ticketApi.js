const API_URL = "http://localhost:5000/api";

/**
 * Common API helper.
 * Keeps fetch logic in one place.
 */
async function request(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

/**
 * Get tickets with backend search, filters,
 * sorting and pagination.
 */
export async function getTickets(params = {}) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", params.page);
  if (params.limit) query.set("limit", params.limit);
  if (params.search) query.set("search", params.search);
  if (params.status) query.set("status", params.status);
  if (params.priority) query.set("priority", params.priority);
  if (params.sort) query.set("sort", params.sort);

  return request(`/tickets?${query.toString()}`);
}

/**
 * Get dashboard summary.
 */
export async function getTicketSummary() {
  return request("/tickets/summary");
}

/**
 * Get one ticket.
 */
export async function getTicket(id) {
  return request(`/tickets/${id}`);
}

/**
 * Create ticket.
 */
export async function createTicket(ticket) {
  return request("/tickets", {
    method: "POST",
    body: JSON.stringify(ticket),
  });
}

/**
 * Update ticket status/priority.
 */
export async function updateTicket(id, data) {
  return request(`/tickets/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}