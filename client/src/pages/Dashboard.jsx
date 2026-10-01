import { useEffect, useState } from "react";

import CreateTicketModal from "../components/tickets/CreateTicketModal";
import TicketDetailsModal from "../components/tickets/TicketDetailsModal";

import {
  getTickets,
  getTicketSummary,
} from "../services/ticketApi";

function Dashboard() {
  // ============================================================
  // MODAL STATE
  // ============================================================

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [selectedTicketId, setSelectedTicketId] =
    useState(null);

  // ============================================================
  // TICKET DATA
  // ============================================================

  const [tickets, setTickets] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
  });

  // ============================================================
  // UI STATE
  // ============================================================

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // FILTER / SEARCH / SORT STATE
  // ============================================================

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: "",
    status: "",
    priority: "",
    sort: "newest",
  });

  // ============================================================
  // PAGINATION STATE
  // ============================================================

  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
  });

  // ============================================================
  // LOAD DASHBOARD DATA
  // ============================================================

  async function loadDashboard() {
    try {
      setLoading(true);
      setError("");

      // Load ticket list and summary at the same time.
      const [ticketResponse, summaryResponse] =
        await Promise.all([
          getTickets(filters),
          getTicketSummary(),
        ]);

      // Backend ticket response.
      setTickets(
        ticketResponse.data.tickets || []
      );

      setPagination(
        ticketResponse.data.pagination || {
          page: 1,
          total: 0,
          totalPages: 0,
        }
      );

      // Summary represents the complete dataset,
      // regardless of active filters.
      setSummary(
        summaryResponse.data || {
          total: 0,
          open: 0,
          inProgress: 0,
          resolved: 0,
        }
      );
    } catch (err) {
      setError(
        err.message || "Unable to load tickets."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================================================
  // LOAD DATA WHEN FILTERS CHANGE
  // ============================================================

  useEffect(() => {
    loadDashboard();
  }, [
    filters.page,
    filters.search,
    filters.status,
    filters.priority,
    filters.sort,
  ]);

  // ============================================================
  // RESET FILTERS
  // ============================================================

  function resetFilters() {
    setFilters({
      page: 1,
      limit: 10,
      search: "",
      status: "",
      priority: "",
      sort: "newest",
    });
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* ======================================================
            HEADER
        ======================================================= */}

        <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 shadow-lg shadow-indigo-600/20">
                <span className="text-lg font-bold">
                  S
                </span>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                  Support Center
                </p>

                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Ticket Dashboard
                </h1>
              </div>
            </div>

            <p className="mt-3 text-sm text-slate-400">
              Manage, track, and resolve customer support
              requests.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              setShowCreateModal(true)
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.98]"
          >
            <span className="text-lg leading-none">
              +
            </span>

            Create Ticket
          </button>

        </header>

        {/* ======================================================
            ERROR
        ======================================================= */}

        {error && (
          <div className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-red-500/30 bg-red-500/10 p-4">

            <div>
              <p className="font-semibold text-red-400">
                Unable to load dashboard
              </p>

              <p className="mt-1 text-sm text-red-400/80">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={loadDashboard}
              className="rounded-lg border border-red-500/30 px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10"
            >
              Retry
            </button>

          </div>
        )}

        {/* ======================================================
            SUMMARY CARDS
        ======================================================= */}

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <SummaryCard
            title="Total Tickets"
            value={summary.total}
            description="Across all tickets"
            icon="◉"
          />

          <SummaryCard
            title="Open"
            value={summary.open}
            description="Waiting for action"
            icon="○"
          />

          <SummaryCard
            title="In Progress"
            value={summary.inProgress}
            description="Currently being handled"
            icon="◐"
          />

          <SummaryCard
            title="Resolved"
            value={summary.resolved}
            description="Successfully completed"
            icon="✓"
          />

        </section>

        {/* ======================================================
            MAIN TICKET PANEL
        ======================================================= */}

        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/10">

          {/* ====================================================
              PANEL HEADER
          ===================================================== */}

          <div className="border-b border-slate-800 p-5 sm:p-6">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div>
                <h2 className="text-lg font-semibold">
                  All Tickets
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Search and filter customer support
                  requests.
                </p>
              </div>

              {pagination.total > 0 && (
                <p className="text-sm text-slate-500">
                  {pagination.total} total tickets
                </p>
              )}

            </div>

            {/* ==================================================
                SEARCH AND FILTERS
            =================================================== */}

            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-12">

              {/* Search */}

              <div className="relative lg:col-span-5">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  ⌕
                </span>

                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((previous) => ({
                      ...previous,
                      page: 1,
                      search: e.target.value,
                    }))
                  }
                  placeholder="Search title or customer email..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />

              </div>

              {/* Status */}

              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((previous) => ({
                    ...previous,
                    page: 1,
                    status: e.target.value,
                  }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 lg:col-span-2"
              >
                <option value="">
                  All Statuses
                </option>

                <option value="OPEN">
                  Open
                </option>

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
                onChange={(e) =>
                  setFilters((previous) => ({
                    ...previous,
                    page: 1,
                    priority: e.target.value,
                  }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 lg:col-span-2"
              >
                <option value="">
                  All Priorities
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="LOW">
                  Low
                </option>
              </select>

              {/* Sort */}

              <select
                value={filters.sort}
                onChange={(e) =>
                  setFilters((previous) => ({
                    ...previous,
                    page: 1,
                    sort: e.target.value,
                  }))
                }
                className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 lg:col-span-2"
              >
                <option value="newest">
                  Newest First
                </option>

                <option value="oldest">
                  Oldest First
                </option>
              </select>

              {/* Reset */}

              <button
                type="button"
                onClick={resetFilters}
                className="rounded-xl border border-slate-700 px-4 py-3 text-sm font-medium text-slate-400 transition hover:bg-slate-800 hover:text-white lg:col-span-1"
              >
                Reset
              </button>

            </div>

          </div>

          {/* ====================================================
              TABLE
          ===================================================== */}

          <div className="overflow-x-auto">

            {loading ? (

              <LoadingState />

            ) : tickets.length === 0 ? (

              <EmptyState
                hasFilters={
                  filters.search ||
                  filters.status ||
                  filters.priority
                }
                onReset={resetFilters}
              />

            ) : (

              <table className="w-full min-w-[900px] text-left">

                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/40">

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Ticket
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Priority
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Created
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Action
                    </th>

                  </tr>
                </thead>

                <tbody>

                  {tickets.map((ticket) => (

                    <tr
                      key={ticket.id}
                      onClick={() =>
                        setSelectedTicketId(
                          ticket.id
                        )
                      }
                      className="group cursor-pointer border-b border-slate-800/70 transition hover:bg-slate-800/40"
                    >

                      {/* Ticket */}

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-sm font-semibold text-indigo-400">
                            #
                          </div>

                          <div className="min-w-0">

                            <p className="truncate font-medium text-white group-hover:text-indigo-300">
                              {ticket.title}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Ticket #{ticket.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* Customer */}

                      <td className="px-6 py-5">

                        <span className="text-sm text-slate-400">
                          {ticket.customerEmail}
                        </span>

                      </td>

                      {/* Priority */}

                      <td className="px-6 py-5">

                        <PriorityBadge
                          priority={ticket.priority}
                        />

                      </td>

                      {/* Status */}

                      <td className="px-6 py-5">

                        <StatusBadge
                          status={ticket.status}
                        />

                      </td>

                      {/* Date */}

                      <td className="px-6 py-5">

                        <div>
                          <p className="text-sm text-slate-300">
                            {formatDate(
                              ticket.createdAt
                            )}
                          </p>

                          <p className="mt-1 text-xs text-slate-600">
                            {formatTime(
                              ticket.createdAt
                            )}
                          </p>
                        </div>

                      </td>

                      {/* Action */}

                      <td className="px-6 py-5 text-right">

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();

                            setSelectedTicketId(
                              ticket.id
                            );
                          }}
                          className="rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-indigo-500 hover:bg-indigo-500/10 hover:text-indigo-400"
                        >
                          View
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            )}

          </div>

          {/* ====================================================
              PAGINATION
          ===================================================== */}

          {!loading &&
            tickets.length > 0 &&
            pagination.totalPages > 0 && (

              <div className="flex flex-col gap-4 border-t border-slate-800 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-sm text-slate-500">

                  Page{" "}

                  <span className="font-medium text-slate-300">
                    {pagination.page}
                  </span>

                  {" "}of{" "}

                  <span className="font-medium text-slate-300">
                    {pagination.totalPages}
                  </span>

                </p>

                <div className="flex gap-2">

                  <button
                    type="button"
                    disabled={
                      pagination.page === 1
                    }
                    onClick={() =>
                      setFilters((previous) => ({
                        ...previous,
                        page:
                          previous.page - 1,
                      }))
                    }
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>

                  <button
                    type="button"
                    disabled={
                      pagination.page ===
                      pagination.totalPages
                    }
                    onClick={() =>
                      setFilters((previous) => ({
                        ...previous,
                        page:
                          previous.page + 1,
                      }))
                    }
                    className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>

                </div>

              </div>

            )}

        </section>

      </div>

      {/* ========================================================
          CREATE TICKET MODAL
      ========================================================= */}

      {showCreateModal && (
        <CreateTicketModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onCreated={loadDashboard}
        />
      )}

      {/* ========================================================
          TICKET DETAILS MODAL
      ========================================================= */}

      {selectedTicketId && (
        <TicketDetailsModal
          ticketId={selectedTicketId}
          onClose={() =>
            setSelectedTicketId(null)
          }
          onUpdated={loadDashboard}
        />
      )}

    </div>
  );
}

/* ================================================================
   SUMMARY CARD
================================================================ */

function SummaryCard({
  title,
  value,
  description,
  icon,
}) {
  return (
    <div className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-slate-700 hover:shadow-xl hover:shadow-black/10">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-2 text-3xl font-bold tracking-tight text-white">
            {value}
          </p>

        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-lg text-indigo-400">
          {icon}
        </div>

      </div>

      <p className="mt-4 text-xs text-slate-600">
        {description}
      </p>

    </div>
  );
}

/* ================================================================
   PRIORITY BADGE
================================================================ */

function PriorityBadge({ priority }) {
  const styles = {
    HIGH:
      "bg-red-500/10 text-red-400 ring-red-500/20",

    MEDIUM:
      "bg-yellow-500/10 text-yellow-400 ring-yellow-500/20",

    LOW:
      "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  };

  const labels = {
    HIGH: "High",
    MEDIUM: "Medium",
    LOW: "Low",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${
        styles[priority] ||
        styles.MEDIUM
      }`}
    >
      {labels[priority] || priority}
    </span>
  );
}

/* ================================================================
   STATUS BADGE
================================================================ */

function StatusBadge({ status }) {
  const styles = {
    OPEN:
      "bg-blue-500/10 text-blue-400 ring-blue-500/20",

    IN_PROGRESS:
      "bg-orange-500/10 text-orange-400 ring-orange-500/20",

    RESOLVED:
      "bg-emerald-500/10 text-emerald-400 ring-emerald-500/20",
  };

  const labels = {
    OPEN: "Open",
    IN_PROGRESS: "In Progress",
    RESOLVED: "Resolved",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ring-1 ${
        styles[status] ||
        styles.OPEN
      }`}
    >
      {labels[status] || status}
    </span>
  );
}

/* ================================================================
   LOADING STATE
================================================================ */

function LoadingState() {
  return (
    <div className="flex min-h-[350px] items-center justify-center">

      <div className="text-center">

        <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />

        <p className="mt-4 text-sm text-slate-500">
          Loading tickets...
        </p>

      </div>

    </div>
  );
}

/* ================================================================
   EMPTY STATE
================================================================ */

function EmptyState({
  hasFilters,
  onReset,
}) {
  return (
    <div className="flex min-h-[350px] items-center justify-center px-6">

      <div className="text-center">

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-2xl">
          📭
        </div>

        <h3 className="mt-4 font-semibold text-white">
          No tickets found
        </h3>

        <p className="mt-2 max-w-sm text-sm text-slate-500">
          {hasFilters
            ? "No tickets match your current search or filters."
            : "There are no support tickets yet."}
        </p>

        {hasFilters && (
          <button
            type="button"
            onClick={onReset}
            className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Clear Filters
          </button>
        )}

      </div>

    </div>
  );
}

/* ================================================================
   DATE FORMATTER
================================================================ */

function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}

/* ================================================================
   TIME FORMATTER
================================================================ */

function formatTime(date) {
  if (!date) return "";

  return new Date(date).toLocaleTimeString(
    "en-IN",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

export default Dashboard;