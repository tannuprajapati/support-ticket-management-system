# Support Ticket Dashboard

A full-stack Support Ticket Management application that helps support teams create, track, search, filter, sort, and update customer support requests.

The project includes a React frontend, Node.js/Express backend, Prisma ORM with SQLite database, REST APIs, and automated API and UI testing using Java, Selenium WebDriver, TestNG, and Maven.

---

## 📌 Project Overview

A small company previously managed customer support requests using spreadsheets. This project provides a centralized web application for managing support tickets efficiently.

The application allows support team members to:

- Create new support tickets
- View existing tickets
- Search tickets
- Filter tickets by status
- Filter tickets by priority
- Sort tickets
- Navigate tickets using pagination
- View individual ticket details
- Update ticket status
- Update ticket priority
- View ticket summary statistics

The project also includes automated testing for both backend APIs and frontend user workflows.

---

## ✨ Features

### Dashboard

The dashboard provides:

- Total ticket count
- Open ticket count
- In-progress ticket count
- Resolved ticket count
- Ticket listing
- Search
- Status filtering
- Priority filtering
- Sorting
- Pagination

### Create Ticket

Users can create a new support ticket with:

- Title
- Customer email
- Description
- Priority

Supported priorities:

- LOW
- MEDIUM
- HIGH

### View Ticket

Users can open a ticket and view its details.

### Update Ticket

Users can update:

- Ticket status
- Ticket priority

Supported statuses:

- OPEN
- IN_PROGRESS
- RESOLVED

### Backend API

The backend provides RESTful APIs for:

- Listing tickets
- Searching tickets
- Filtering tickets
- Sorting tickets
- Pagination
- Getting ticket details
- Creating tickets
- Updating tickets
- Getting ticket summary

### Automated Testing

The project includes:

- API automation tests
- Selenium UI automation tests
- TestNG test suite
- Maven-based test execution

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express.js
- REST API
- CORS
- Zod

### Database

- SQLite
- Prisma ORM

### Testing

- Java 21
- Selenium WebDriver
- TestNG
- Maven
- Google Chrome
- ChromeDriver

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

---

## 📂 Project Structure

```text
Support-Tickets/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   └── tickets/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── ...
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   │
│   ├── package.json
│   └── ...
│
├── automation-tests/
│   ├── src/
│   │   └── test/
│   │       └── java/
│   │
│   ├── pom.xml
│   ├── testng.xml
│   └── target/
│
├── README.md
└── .gitignore