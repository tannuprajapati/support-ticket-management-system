# Support Ticket Dashboard

A full-stack support ticket management application built for a technical assignment.

The application allows support teams to create, search, filter, sort, view, and update customer support tickets. Ticket data is persisted in a SQLite database using Prisma ORM.

---

## Features

### Ticket Management

- Create support tickets
- Required title with a maximum length of 120 characters
- Required description
- Customer email validation
- Priority:
  - Low
  - Medium
  - High
- Status:
  - Open
  - In Progress
  - Resolved
- Automatically generated creation and update timestamps
- Update ticket status and priority
- Changes persist after page refresh

### Ticket Listing

- Search tickets by title or customer email
- Filter by status
- Filter by priority
- Search and filters work together
- Sort by creation date:
  - Newest first
  - Oldest first
- Server-side pagination
- 10 tickets per page

### Dashboard

- Total ticket count
- Open ticket count
- In Progress ticket count
- Resolved ticket count
- Summary counts represent the complete dataset and are not affected by active filters

### User Experience

- Responsive desktop and mobile layout
- Loading states
- Empty states
- Error states
- Form validation
- Clean and modern dashboard UI

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- JavaScript
- Fetch API

## Backend

- Node.js
- Express.js
- REST API
- Zod for backend validation

## Database

- SQLite
- Prisma ORM

## Testing

- Vitest
- Supertest

## Development Tools

- Git
- GitHub
- Nodemon

---

# Project Structure

```text
Support-Tickets/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── tickets/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── services/
│   │   │   └── ticketApi.js
│   │   │
│   │   └── ...
│   │
│   └── package.json
│
├── server/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.js
│   │   └── migrations/
│   │
│   ├── src/
│   │   ├── controllers/
│   │   │   └── ticketController.js
│   │   │
│   │   ├── routes/
│   │   │   └── ticketRoutes.js
│   │   │
│   │   ├── validators/
│   │   │   └── ticketValidator.js
│   │   │
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   │
│   │   ├── lib/
│   │   │   └── prisma.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   │   └── ticket.test.js
│   │
│   └── package.json
│
├── README.md
└── .gitignore