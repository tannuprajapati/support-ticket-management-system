import { useState } from "react";
import { createTicket } from "../../services/ticketApi";

function CreateTicketModal({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    customerEmail: "",
    priority: "MEDIUM",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove field error as the user corrects it.
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  }

  function validate() {
    const newErrors = {};

    if (!form.title.trim()) {
      newErrors.title = "Title is required.";
    } else if (form.title.trim().length > 120) {
      newErrors.title =
        "Title cannot exceed 120 characters.";
    }

    if (!form.description.trim()) {
      newErrors.description =
        "Description is required.";
    }

    if (!form.customerEmail.trim()) {
      newErrors.customerEmail =
        "Customer email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.customerEmail
      )
    ) {
      newErrors.customerEmail =
        "Enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);

      await createTicket({
        title: form.title.trim(),
        description: form.description.trim(),
        customerEmail: form.customerEmail.trim(),
        priority: form.priority,
      });

      onCreated();
      onClose();
    } catch (error) {
      setServerError(
        error.message || "Unable to create ticket."
      );
    } finally {
      setSubmitting(false);
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
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Create Support Ticket
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Add a new customer support request.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          {serverError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {serverError}
            </div>
          )}

          {/* Title */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-200">
                Title
              </label>

              <span className="text-xs text-slate-500">
                {form.title.length}/120
              </span>
            </div>

            <input
              name="title"
              value={form.title}
              maxLength={120}
              onChange={handleChange}
              placeholder="e.g. Unable to reset password"
              className={`mt-2 w-full rounded-lg border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                errors.title
                  ? "border-red-500"
                  : "border-slate-700 focus:border-indigo-500"
              }`}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-red-400">
                {errors.title}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-slate-200">
              Description
            </label>

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe the customer's issue..."
              className={`mt-2 w-full resize-none rounded-lg border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                errors.description
                  ? "border-red-500"
                  : "border-slate-700 focus:border-indigo-500"
              }`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-400">
                {errors.description}
              </p>
            )}
          </div>

          {/* Email + Priority */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-200">
                Customer Email
              </label>

              <input
                type="email"
                name="customerEmail"
                value={form.customerEmail}
                onChange={handleChange}
                placeholder="customer@example.com"
                className={`mt-2 w-full rounded-lg border bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 ${
                  errors.customerEmail
                    ? "border-red-500"
                    : "border-slate-700 focus:border-indigo-500"
                }`}
              />

              {errors.customerEmail && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.customerEmail}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-slate-200">
                Priority
              </label>

              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-lg border border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Creating..."
                : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicketModal;