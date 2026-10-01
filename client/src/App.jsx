import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Create a new support ticket */}
        <Route
          path="/tickets/create"
          element={<CreateTicket />}
        />

        {/* View and update a ticket */}
        <Route
          path="/tickets/:id"
          element={<TicketDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;