import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getTickets,
  getTicketSummary,
} from "../services/ticketApi";

function Dashboard() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
    sort: "newest",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
  });

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      const [ticketResponse, summaryResponse] =
        await Promise.all([
          getTickets(filters),
          getTicketSummary(),
        ]);

      setTickets(ticketResponse.data.tickets);
      setPagination(ticketResponse.data.pagination);
      setSummary(summaryResponse.data);
    } catch (err) {
      setError(
        err.message || "Unable to load support tickets."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, [
    filters.page,
    filters.search,
    filters.status,
    filters.priority,
    filters.sort,
  ]);

  function updateFilter(name, value) {
    setFilters((previous) => ({
      ...previous,
      [name]: value,
      page: 1,
    }));
  }

  function clearFilters() {
    setFilters({
      page: 1,
      limit: 10,
      search: "",
      status: "",
      priority: "",
      sort: "newest",
    });
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />
        <div className="absolute -right-40 top-40 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}
        <header className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-lg shadow-lg shadow-indigo-600/20">
                  S
                </div>

                <span className="text-sm font-semibold text-indigo-400">
                  SupportDesk
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Support Ticket Dashboard
              </h1>

              <p className="mt-2 text-sm text-slate-400 sm:text-base">
                Manage customer requests and keep your support
                queue organized.
              </p>
            </div>

            <button
              onClick={() => navigate("/tickets/create")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:-translate-y-0.5 hover:bg-indigo-500"
            >
              <span className="text-lg">+</span>
              Create Ticket
            </button>

          </div>
        </header>

        {/* ================= SUMMARY ================= */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

          <SummaryCard
            label="Total Tickets"
            value={summary.total}
            icon="📊"
            description="Across all requests"
          />

          <SummaryCard
            label="Open"
            value={summary.open}
            icon="○"
            color="blue"
            description="Waiting for action"
          />

          <SummaryCard
            label="In Progress"
            value={summary.inProgress}
            icon="◐"
            color="yellow"
            description="Currently being handled"
          />

          <SummaryCard
            label="Resolved"
            value={summary.resolved}
            icon="✓"
            color="green"
            description="Successfully completed"
          />

        </section>

        {/* ================= ERROR ================= */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            <span>⚠️</span>

            <div>
              <p className="font-semibold">
                Something went wrong
              </p>

              <p className="mt-1 text-red-300/80">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* ================= FILTERS ================= */}
        <section className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-xl shadow-black/10 backdrop-blur sm:p-5">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">
                Find tickets
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Search and filter your support requests.
              </p>
            </div>

            {(filters.search ||
              filters.status ||
              filters.priority) && (
              <button
                onClick={clearFilters}
                className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="grid gap-3 lg:grid-cols-[1fr_170px_170px_170px]">

            {/* Search */}
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                🔍
              </span>

              <input
                value={filters.search}
                onChange={(event) =>
                  updateFilter(
                    "search",
                    event.target.value
                  )
                }
                placeholder="Search by title or customer email..."
                className="h-12 w-full rounded-2xl border border-slate-800 bg-slate-950 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              />
            </div>

            {/* Status */}
            <select
              value={filters.status}
              onChange={(event) =>
                updateFilter(
                  "status",
                  event.target.value
                )
              }
              className="h-12 rounded-2xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-300 outline-none transition focus:border-indigo-500"
            >
              <option value="">All statuses</option>
              <option value="OPEN">Open</option>
              <option value="IN_PROGRESS">
                In Progress
              </option>
              <option value="RESOLVED">
                Resolved
              </option>
            </select>

            {/* Priority */}
            <select
              value={filters.priority}
              onChange={(event) =>
                updateFilter(
                  "priority",
                  event.target.value
                )
              }
              className="h-12 rounded-2xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-300 outline-none transition focus:border-indigo-500"
            >
              <option value="">All priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(event) =>
                updateFilter(
                  "sort",
                  event.target.value
                )
              }
              className="h-12 rounded-2xl border border-slate-800 bg-slate-950 px-4 text-sm text-slate-300 outline-none transition focus:border-indigo-500"
            >
              <option value="newest">
                Newest first
              </option>

              <option value="oldest">
                Oldest first
              </option>
            </select>

          </div>
        </section>

        {/* ================= TICKETS ================= */}
        <section className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10">

          <div className="flex flex-col gap-3 border-b border-slate-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

            <div>
              <h2 className="font-semibold">
                Tickets
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {pagination.total} total tickets
              </p>
            </div>

            <div className="text-xs text-slate-500">
              Showing page {pagination.page} of{" "}
              {pagination.totalPages || 1}
            </div>

          </div>

          {loading ? (
            <LoadingState />
          ) : tickets.length === 0 ? (
            <EmptyState
              hasFilters={
                filters.search ||
                filters.status ||
                filters.priority
              }
              onClear={clearFilters}
            />
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[760px]">

                <thead>
                  <tr className="border-b border-slate-800 text-left text-xs uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4 font-medium">
                      Ticket
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Customer
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Priority
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Status
                    </th>

                    <th className="px-6 py-4 font-medium">
                      Created
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-800">

                  {tickets.map((ticket) => (
                    <tr
                      key={ticket.id}
                      onClick={() =>
                        navigate(
                          `/tickets/${ticket.id}`
                        )
                      }
                      className="group cursor-pointer transition hover:bg-slate-800/40"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-sm font-bold text-indigo-400">
                            #
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[280px] truncate text-sm font-semibold text-white group-hover:text-indigo-400">
                              {ticket.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Ticket #{ticket.id}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm text-slate-300">
                          {ticket.customerEmail}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <PriorityBadge
                          priority={ticket.priority}
                        />
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge
                          status={ticket.status}
                        />
                      </td>

                      <td className="px-6 py-5">
                        <span className="text-sm text-slate-400">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </td>

                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          )}

          {/* ================= PAGINATION ================= */}
          {!loading &&
            tickets.length > 0 && (
              <Pagination
                pagination={pagination}
                setFilters={setFilters}
              />
            )}

        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-xs text-slate-600">
          SupportDesk • Customer Support Management
        </footer>

      </main>
    </div>
  );
}

/* =========================================================
   SUMMARY CARD
========================================================= */

function SummaryCard({
  label,
  value,
  icon,
  color = "indigo",
  description,
}) {
  const colors = {
    indigo:
      "bg-indigo-500/10 text-indigo-400",
    blue:
      "bg-blue-500/10 text-blue-400",
    yellow:
      "bg-yellow-500/10 text-yellow-400",
    green:
      "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-5 transition duration-200 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl hover:shadow-black/20">

      <div className="flex items-start justify-between">

        <div>
          <p className="text-sm font-medium text-slate-400">
            {label}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl text-lg ${colors[color]}`}
        >
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs text-slate-500">
        {description}
      </p>

    </div>
  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({ priority }) {
  const styles = {
    HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
    MEDIUM:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    LOW:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
        styles[priority] || styles.MEDIUM
      }`}
    >
      {priority}
    </span>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }) {
  const styles = {
    OPEN:
      "bg-blue-500/10 text-blue-400 border-blue-500/20",

    IN_PROGRESS:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",

    RESOLVED:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };

  const labels = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1.5 text-xs font-semibold ${
        styles[status] || styles.OPEN
      }`}
    >
      <span className="mr-1.5">●</span>
      {labels[status] || status}
    </span>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function LoadingState() {
  return (
    <div className="divide-y divide-slate-800">

      {[1, 2, 3, 4, 5].map((item) => (
        <div
          key={item}
          className="animate-pulse p-6"
        >
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-xl bg-slate-800" />

            <div className="flex-1">
              <div className="h-4 w-1/3 rounded bg-slate-800" />
              <div className="mt-3 h-3 w-1/4 rounded bg-slate-800" />
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState({
  hasFilters,
  onClear,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-20 text-center">

      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-800 text-2xl">
        🎫
      </div>

      <h3 className="mt-5 text-lg font-semibold">
        No tickets found
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-500">
        {hasFilters
          ? "Try changing your search or filters to find other tickets."
          : "There are no support tickets yet. Create the first one to get started."}
      </p>

      {hasFilters && (
        <button
          onClick={onClear}
          className="mt-5 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold transition hover:bg-indigo-500"
        >
          Clear filters
        </button>
      )}

    </div>
  );
}

/* =========================================================
   PAGINATION
========================================================= */

function Pagination({
  pagination,
  setFilters,
}) {
  const {
    page,
    totalPages,
  } = pagination;

  if (totalPages <= 1) {
    return null;
  }

  function changePage(newPage) {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setFilters((previous) => ({
      ...previous,
      page: newPage,
    }));
  }

  return (
    <div className="flex flex-col gap-4 border-t border-slate-800 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

      <p className="text-xs text-slate-500">
        Page {page} of {totalPages}
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={page === 1}
          onClick={() => changePage(page - 1)}
          className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          ←
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        )
          .slice(
            Math.max(0, page - 3),
            Math.min(totalPages, page + 2)
          )
          .map((number) => (
            <button
              key={number}
              onClick={() => changePage(number)}
              className={`h-9 min-w-9 rounded-xl px-3 text-sm font-medium transition ${
                number === page
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              {number}
            </button>
          ))}

        <button
          disabled={page === totalPages}
          onClick={() => changePage(page + 1)}
          className="rounded-xl border border-slate-800 px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          →
        </button>

      </div>
    </div>
  );
}

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(value) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

export default Dashboard;