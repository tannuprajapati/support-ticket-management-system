import { useEffect, useState } from "react";
import {
  getTicket,
  updateTicket,
} from "../../services/ticketApi";

function TicketDetailsModal({
  ticketId,
  onClose,
  onUpdated,
}) {
  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Load the complete ticket from the backend.
   */
  async function loadTicket() {
    try {
      setLoading(true);
      setError("");

      const response = await getTicket(ticketId);

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
  }, [ticketId]);

  /**
   * Save status and priority changes.
   */
  async function handleSave() {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await updateTicket(ticketId, {
        status,
        priority,
      });

      setSuccess(
        "Ticket updated successfully."
      );

      // Refresh the ticket details.
      await loadTicket();

      // Refresh dashboard data.
      if (onUpdated) {
        await onUpdated();
      }

      // Remove success message after a short delay.
      setTimeout(() => {
        setSuccess("");
      }, 2500);
    } catch (err) {
      setError(
        err.message || "Unable to update ticket."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-indigo-400">
              Ticket Details
            </p>

            <h2 className="mt-1 text-xl font-semibold text-white">
              {ticket
                ? ticket.title
                : "Loading ticket..."}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* =====================================================
            CONTENT
        ====================================================== */}

        <div className="p-6">

          {loading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <div className="text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-700 border-t-indigo-500" />

                <p className="mt-3 text-sm text-slate-500">
                  Loading ticket...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          ) : ticket ? (
            <div className="space-y-6">

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400">
                  {success}
                </div>
              )}

              {/* =================================================
                  DESCRIPTION
              ================================================== */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Description
                </p>

                <div className="mt-2 rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-300">
                    {ticket.description}
                  </p>
                </div>
              </div>

              {/* =================================================
                  CUSTOMER
              ================================================== */}

              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  Customer
                </p>

                <p className="mt-2 text-sm text-slate-300">
                  {ticket.customerEmail}
                </p>
              </div>

              {/* =================================================
                  TICKET ID + DATES
              ================================================== */}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <InfoItem
                  label="Ticket ID"
                  value={`#${ticket.id}`}
                />

                <InfoItem
                  label="Created"
                  value={formatDate(ticket.createdAt)}
                />

                <InfoItem
                  label="Last Updated"
                  value={formatDate(ticket.updatedAt)}
                />

              </div>

              {/* =================================================
                  STATUS + PRIORITY
              ================================================== */}

              <div className="grid grid-cols-1 gap-5 border-t border-slate-800 pt-6 sm:grid-cols-2">

                <div>
                  <label className="text-sm font-medium text-slate-200">
                    Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
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

                <div>
                  <label className="text-sm font-medium text-slate-200">
                    Priority
                  </label>

                  <select
                    value={priority}
                    onChange={(e) =>
                      setPriority(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
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

              </div>

            </div>
          ) : null}

        </div>

        {/* =====================================================
            FOOTER
        ====================================================== */}

        {!loading && ticket && (
          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 px-6 py-5 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
            >
              Close
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

/**
 * Small reusable information field.
 */
function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-slate-300">
        {value}
      </p>
    </div>
  );
}

/**
 * Format backend timestamps into a readable date.
 */
function formatDate(date) {
  if (!date) return "—";

  return new Date(date).toLocaleString();
}

export default TicketDetailsModal;