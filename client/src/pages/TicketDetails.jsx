import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getTicket,
  updateTicket,
} from "../services/ticketApi";

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const response = await getTicket(id);

      const ticketData = response.data;

      setTicket(ticketData);
      setStatus(ticketData.status);
      setPriority(ticketData.priority);
    } catch (err) {
      setError(
        err.message || "Unable to load ticket."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTicket();
  }, [id]);

  async function handleSave() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateTicket(id, {
        status,
        priority,
      });

      const updatedTicket = response.data;

      setTicket(updatedTicket);
      setStatus(updatedTicket.status);
      setPriority(updatedTicket.priority);

      setSuccess("Ticket updated successfully.");

      // Remove success message after a short delay.
      setTimeout(() => {
        setSuccess("");
      }, 3000);
    } catch (err) {
      setError(
        err.message || "Unable to update ticket."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingState />;
  }

  if (error && !ticket) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => navigate("/")}
            className="mb-6 text-sm text-slate-400 hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6">
            <h2 className="font-semibold text-red-300">
              Unable to load ticket
            </h2>

            <p className="mt-2 text-sm text-red-300/80">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background decoration */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-600/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/10 blur-3xl" />
      </div>

      <main className="relative mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-7 flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
        >
          ← Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div>
            <div className="mb-3 flex items-center gap-3">

              <span className="rounded-lg bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400">
                TICKET #{ticket.id}
              </span>

              <StatusBadge status={ticket.status} />

            </div>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {ticket.title}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Created{" "}
              {formatDate(ticket.createdAt)}
            </p>
          </div>

          <PriorityBadge
            priority={ticket.priority}
          />

        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
            ⚠️ {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-300">
            ✓ {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          {/* ================= MAIN DETAILS ================= */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/10 sm:p-8">

            <div className="mb-7">
              <h2 className="text-lg font-semibold">
                Ticket details
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete information about this customer request.
              </p>
            </div>

            {/* Description */}
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </p>

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {ticket.description}
                </p>
              </div>
            </div>

            {/* Customer */}
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </p>

              <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">

                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-500/10 font-semibold text-indigo-400">
                  {ticket.customerEmail
                    ?.charAt(0)
                    ?.toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Customer
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {ticket.customerEmail}
                  </p>
                </div>

              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-7 grid gap-4 sm:grid-cols-2">

              <InfoItem
                label="Created"
                value={formatDateTime(
                  ticket.createdAt
                )}
              />

              <InfoItem
                label="Last updated"
                value={formatDateTime(
                  ticket.updatedAt
                )}
              />

            </div>

          </section>

          {/* ================= UPDATE PANEL ================= */}
          <aside className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-xl shadow-black/10">

            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Update ticket
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Change the ticket priority or status.
              </p>
            </div>

            {/* Status */}
            <div className="mb-5">
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              >
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
            </div>

            {/* Priority */}
            <div className="mb-6">
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Priority
              </label>

              <select
                id="priority"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-300 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              >
                <option value="LOW">
                  Low
                </option>

                <option value="MEDIUM">
                  Medium
                </option>

                <option value="HIGH">
                  High
                </option>
              </select>
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  Saving...
                </span>
              ) : (
                "Save Changes"
              )}
            </button>

            {/* Current values */}
            <div className="mt-6 border-t border-slate-800 pt-5">

              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Current values
              </p>

              <div className="space-y-3">

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Status
                  </span>

                  <StatusBadge status={status} />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Priority
                  </span>

                  <PriorityBadge
                    priority={priority}
                  />
                </div>

              </div>

            </div>

          </aside>

        </div>

      </main>
    </div>
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
      {labels[status] || status}
    </span>
  );
}

/* =========================================================
   PRIORITY BADGE
========================================================= */

function PriorityBadge({ priority }) {
  const styles = {
    HIGH:
      "bg-red-500/10 text-red-400 border-red-500/20",

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
   INFO ITEM
========================================================= */

function InfoItem({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-sm font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   LOADING STATE
========================================================= */

function LoadingState() {
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">

      <div className="mx-auto max-w-5xl animate-pulse">

        <div className="mb-8 h-5 w-40 rounded bg-slate-800" />

        <div className="mb-8">
          <div className="h-10 w-2/3 rounded bg-slate-800" />
          <div className="mt-3 h-4 w-48 rounded bg-slate-800" />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

          <div className="h-96 rounded-3xl bg-slate-900" />

          <div className="h-80 rounded-3xl bg-slate-900" />

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   DATE HELPERS
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

function formatDateTime(value) {
  if (!value) return "—";

  return new Date(value).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}

export default TicketDetails;