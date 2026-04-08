"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAssignments } from "../context/AssignmentContext";

const inputClass =
  "w-full rounded-md border border-gray-200 px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors";

export default function AddAssignment() {
  const { addAssignment } = useAssignments();
  const router = useRouter();

  const [form, setForm] = useState({
    course: "",
    title: "",
    dueDate: "",
    description: "",
    priority: "medium",
    status: "todo",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addAssignment(form);
    router.push("/");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Add Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Course
          </label>
          <input
            type="text"
            required
            placeholder="e.g. MPCS 51238"
            value={form.course}
            onChange={(e) => update("course", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Title
          </label>
          <input
            type="text"
            required
            placeholder="Assignment title"
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Due Date
          </label>
          <input
            type="date"
            required
            value={form.dueDate}
            onChange={(e) => update("dueDate", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Details about the assignment..."
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            className={inputClass + " resize-none"}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={form.priority}
              onChange={(e) => update("priority", e.target.value)}
              className={inputClass}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={(e) => update("status", e.target.value)}
              className={inputClass}
            >
              <option value="todo">To do</option>
              <option value="in-progress">In progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Assignment
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
