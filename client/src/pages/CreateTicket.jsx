import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTicket } from "../services/ticketApi";

function CreateTicket() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    customerEmail: "",
    priority: "MEDIUM",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    // Remove the field error once the user starts correcting it.
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
      newErrors.title = "Title cannot exceed 120 characters.";
    }

    if (!form.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!form.customerEmail.trim()) {
      newErrors.customerEmail = "Customer email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.customerEmail)
    ) {
      newErrors.customerEmail = "Enter a valid email address.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setServerError("");

      await createTicket({
        title: form.title.trim(),
        description: form.description.trim(),
        customerEmail: form.customerEmail.trim(),
        priority: form.priority,
      });

      navigate("/");
    } catch (error) {
      setServerError(
        error.message || "Unable to create the ticket."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <span className="text-lg">←</span>
            Back to dashboard
          </button>

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-400">
              Support Center
            </p>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Create a new ticket
            </h1>

            <p className="mt-3 max-w-2xl text-slate-400">
              Create a support request and provide enough information
              for your team to resolve the issue quickly.
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/20">

          {/* Card Header */}
          <div className="border-b border-slate-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/5 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500/10 text-2xl">
                🎫
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Ticket information
                </h2>

                <p className="text-sm text-slate-400">
                  Fields marked with * are required.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-7 p-6 sm:p-8"
          >

            {/* Server Error */}
            {serverError && (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <div className="flex gap-3">
                  <span>⚠️</span>
                  <p>{serverError}</p>
                </div>
              </div>
            )}

            {/* Title */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="title"
                  className="text-sm font-semibold text-slate-200"
                >
                  Ticket title *
                </label>

                <span className="text-xs text-slate-500">
                  {form.title.length}/120
                </span>
              </div>

              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                maxLength={120}
                placeholder="e.g. Unable to reset my password"
                className={`w-full rounded-2xl border bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 ${
                  errors.title
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                }`}
              />

              {errors.title && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="customerEmail"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Customer email *
              </label>

              <input
                id="customerEmail"
                name="customerEmail"
                type="email"
                value={form.customerEmail}
                onChange={handleChange}
                placeholder="customer@example.com"
                className={`w-full rounded-2xl border bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 ${
                  errors.customerEmail
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                }`}
              />

              {errors.customerEmail && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.customerEmail}
                </p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label
                htmlFor="priority"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Priority
              </label>

              <div className="grid grid-cols-3 gap-3">
                {["LOW", "MEDIUM", "HIGH"].map((priority) => (
                  <button
                    key={priority}
                    type="button"
                    onClick={() =>
                      setForm((previous) => ({
                        ...previous,
                        priority,
                      }))
                    }
                    className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${
                      form.priority === priority
                        ? priority === "HIGH"
                          ? "border-red-500/50 bg-red-500/10 text-red-400"
                          : priority === "MEDIUM"
                          ? "border-yellow-500/50 bg-yellow-500/10 text-yellow-400"
                          : "border-emerald-500/50 bg-emerald-500/10 text-emerald-400"
                        : "border-slate-800 bg-slate-950 text-slate-500 hover:border-slate-700 hover:text-slate-300"
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-slate-200"
              >
                Description *
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={7}
                placeholder="Describe the customer's issue in detail..."
                className={`w-full resize-none rounded-2xl border bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:ring-2 ${
                  errors.description
                    ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/10"
                    : "border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/10"
                }`}
              />

              {errors.description && (
                <p className="mt-2 text-xs text-red-400">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-2xl border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating ticket..." : "Create ticket"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;