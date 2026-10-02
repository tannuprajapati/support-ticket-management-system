# Support Ticket Management System

A full-stack Support Ticket Management System built as a technical assignment for managing customer support requests.

The application allows support teams to create, search, filter, sort, view, and update support tickets while maintaining persistent data in PostgreSQL.

## Live Demo

**Frontend:**  
https://support-ticket-management-system-2.onrender.com

**Backend API:**  
https://support-ticket-management-system-1.onrender.com/api/tickets

**GitHub Repository:**  
https://github.com/tannuprajapati/support-ticket-management-system

---

## Features

### 1. Create Support Tickets

Users can create support tickets with:

- Title
- Description
- Customer email
- Priority
- Status
- Automatically generated created timestamp
- Automatically generated updated timestamp

### 2. Ticket Validation

Validation is implemented on both the frontend and backend.

Supported validation includes:

- Required title
- Maximum 120-character title
- Required description
- Valid customer email
- Valid priority
- Valid status
- Meaningful validation error messages

### 3. Ticket Listing

The dashboard supports:

- Search by ticket title
- Search by customer email
- Filter by status
- Filter by priority
- Sort by creation date
- Newest-first sorting
- Oldest-first sorting
- Pagination
- 10 tickets per page

Search, filtering, sorting, and pagination are handled by the backend API.

### 4. View and Update Tickets

Users can:

- Open a ticket
- View complete ticket details
- Update ticket status
- Update ticket priority

Changes are persisted in PostgreSQL and remain after refreshing the application.

### 5. Dashboard Summary

The dashboard displays:

- Total number of tickets
- Open tickets
- In Progress tickets
- Resolved tickets

Summary counts represent the complete dataset and are not affected by active search or filters.

### 6. Responsive UI

The application is designed to work across:

- Desktop
- Tablet
- Mobile

The interface also includes:

- Loading states
- Empty states
- Error states
- Form validation feedback

---

# Technology Stack

## Frontend

- React
- Vite
- JavaScript
- CSS / Tailwind CSS
- Fetch API

## Backend

- Node.js
- Express.js
- REST API
- Prisma ORM

## Database

- PostgreSQL
- Neon PostgreSQL

## Testing

### API Tests

- Java
- Maven
- TestNG
- REST API testing

### UI Tests

- Selenium WebDriver
- Java
- TestNG
- Maven

## Deployment

- GitHub
- Render
- Neon PostgreSQL

---

# Project Structure

```text
Support-Tickets/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── automation-tests/
│   ├── src/
│   ├── pom.xml
│   └── testng.xml
│
├── .gitignore
└── README.md