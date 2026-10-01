import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";


describe("Support Ticket API", () => {

  // ============================================================
  // TEST 1: VALIDATION
  // ============================================================

  it("should reject a ticket with an invalid customer email", async () => {

    const response = await request(app)
      .post("/api/tickets")
      .send({
        title: "Test support ticket",
        description: "This is a test ticket.",
        customerEmail: "invalid-email",
        priority: "HIGH",
      });

    expect(response.status).toBe(400);

    expect(response.body.success).toBe(false);
  });


  // ============================================================
  // TEST 2: SEARCH / QUERYING
  // ============================================================

  it("should search tickets by title or customer email", async () => {

    const response = await request(app)
      .get("/api/tickets")
      .query({
        search: "ticket",
        page: 1,
        limit: 10,
      });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(
      response.body.data
    ).toBeDefined();

    expect(
      response.body.data.tickets
    ).toBeInstanceOf(Array);
  });


  // ============================================================
  // TEST 3: UPDATE TICKET
  // ============================================================

  it("should update ticket status and priority", async () => {

    // First get an existing ticket.
    const listResponse = await request(app)
      .get("/api/tickets")
      .query({
        page: 1,
        limit: 1,
      });

    expect(listResponse.status).toBe(200);

    const tickets =
      listResponse.body.data.tickets;

    expect(tickets.length).toBeGreaterThan(0);

    const ticketId = tickets[0].id;

    // Update the ticket.
    const updateResponse = await request(app)
      .patch(`/api/tickets/${ticketId}`)
      .send({
        status: "RESOLVED",
        priority: "HIGH",
      });

    expect(updateResponse.status).toBe(200);

    expect(
      updateResponse.body.success
    ).toBe(true);
  });

});