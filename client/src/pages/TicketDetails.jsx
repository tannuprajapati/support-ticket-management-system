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

  useEffect(() => {
    loadTicket();
  }, [id]);

  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const response = await getTicket(id);

      const ticketData =
        response.data?.ticket ||
        response.data;

      setTicket(ticketData);
      setStatus(ticketData.status);
      setPriority(ticketData.priority);
    } catch (error) {
      setError(
        error.message || "Unable to load this ticket."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateTicket(id, {
        status,
        priority,
      });

      const updatedTicket =
        response.data?.ticket ||
        response.data;

      setTicket(updatedTicket);

      setSuccess("Ticket updated successfully.");

      setTimeout(() => {
        setSuccess("");
      }, 3000);

    } catch (error) {
      setError(
        error.message || "Unable to update the ticket."
      );
    } finally {
      setSaving(false);
    }
  }

  function getStatusStyle(value) {
    const styles = {
      OPEN: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      IN_PROGRESS:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      RESOLVED:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };

    return styles[value] || styles.OPEN;
  }

  function getPriorityStyle(value) {
    const styles = {
      HIGH: "bg-red-500/10 text-red-400 border-red-500/20",
      MEDIUM:
        "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      LOW:
        "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    };

    return styles[value] || styles.MEDIUM;
  }

  function formatStatus(value) {
    return {
      OPEN: "Open",
      IN_PROGRESS: "In Progress",
      RESOLVED: "Resolved",
    }[value] || value;
  }

  function formatDate(value) {
    if (!value) return "—";

    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-8 text-white">
        <div className="mx-auto max-w-4xl animate-pulse">

          <div className="mb-8 h-4 w-32 rounded bg-slate-800" />

          <div className="h-10 w-3/4 rounded bg-slate-800" />

          <div className="mt-3 h-5 w-1/2 rounded bg-slate-800" />

          <div className="mt-8 h-96 rounded-3xl bg-slate-900" />
        </div>
      </div>
    );
  }

  if (error && !ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-red-500/20 bg-slate-900 p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 text-2xl">
            ⚠️
          </div>

          <h2 className="mt-5 text-xl font-bold">
            Unable to load ticket
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold transition hover:bg-indigo-500"
          >
            Back to dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
        >
          <span className="text-lg">←</span>
          Back to dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-xl bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-400">
                  TICKET #{ticket.id}
                </span>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                    ticket.status
                  )}`}
                >
                  {formatStatus(ticket.status)}
                </span>
              </div>

              <h1 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
                {ticket.title}
              </h1>

              <p className="mt-3 text-sm text-slate-400">
                Created {formatDate(ticket.createdAt)}
              </p>
            </div>

            <span
              className={`self-start rounded-full border px-4 py-2 text-sm font-semibold ${getPriorityStyle(
                ticket.priority
              )}`}
            >
              {ticket.priority} Priority
            </span>

          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="mb-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            ✓ {success}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Ticket information */}
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">

            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </p>

              <div className="mt-4 rounded-2xl border border-slate-800 bg-slate-950 p-5">
                <p className="whitespace-pre-wrap text-sm leading-7 text-slate-300">
                  {ticket.description}
                </p>
              </div>
            </div>

            {/* Customer */}
            <div className="border-t border-slate-800 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Customer
              </p>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-lg">
                  ✉️
                </div>

                <div>
                  <p className="text-sm font-medium text-white">
                    Customer email
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    {ticket.customerEmail}
                  </p>
                </div>
              </div>
            </div>

            {/* Timestamps */}
            <div className="mt-6 grid gap-4 border-t border-slate-800 pt-6 sm:grid-cols-2">
              <div>
                <p className="text-xs text-slate-500">
                  Created
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {formatDate(ticket.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Last updated
                </p>

                <p className="mt-1 text-sm text-slate-300">
                  {formatDate(ticket.updatedAt)}
                </p>
              </div>
            </div>
          </div>

          {/* Update panel */}
          <div className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="mb-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 text-xl">
                ⚙️
              </div>

              <h2 className="text-lg font-bold">
                Update ticket
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Change the priority or status of this request.
              </p>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Status
              </label>

              <select
                id="status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              >
                <option value="OPEN">Open</option>
                <option value="IN_PROGRESS">
                  In Progress
                </option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>

            {/* Priority */}
            <div className="mt-5">
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold text-slate-300"
              >
                Priority
              </label>

              <select
                id="priority"
                value={priority}
                onChange={(event) =>
                  setPriority(event.target.value)
                }
                className="w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-6 w-full rounded-2xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving changes..." : "Save changes"}
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;