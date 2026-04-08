"use client";

import { createContext, useContext, useState } from "react";

const AssignmentContext = createContext();

const sampleAssignments = [
  {
    id: "1",
    course: "MPCS 51238",
    title: "Large-Scale Data Analysis Final Project",
    dueDate: "2026-04-15",
    description:
      "Build an end-to-end data pipeline using Apache Spark to process and analyze a large dataset. Submit code, report, and presentation slides.",
    priority: "high",
    status: "in-progress",
  },
  {
    id: "2",
    course: "MPCS 51050",
    title: "OOP Design Patterns Homework 4",
    dueDate: "2026-04-12",
    description:
      "Implement the Observer and Strategy patterns in a simulated trading system. Include UML diagrams and unit tests.",
    priority: "high",
    status: "todo",
  },
  {
    id: "3",
    course: "MPCS 55001",
    title: "Algorithms Problem Set 6",
    dueDate: "2026-04-20",
    description:
      "Solve problems on dynamic programming and graph algorithms. Provide proofs of correctness and runtime analysis.",
    priority: "medium",
    status: "todo",
  },
  {
    id: "4",
    course: "MPCS 51238",
    title: "Data Analysis Reading Response",
    dueDate: "2026-04-10",
    description:
      "Write a 2-page response to the MapReduce paper. Discuss trade-offs and modern alternatives.",
    priority: "low",
    status: "done",
  },
];

export function AssignmentProvider({ children }) {
  const [assignments, setAssignments] = useState(sampleAssignments);

  function addAssignment(assignment) {
    setAssignments((prev) => [
      ...prev,
      { ...assignment, id: Date.now().toString() },
    ]);
  }

  function updateAssignment(id, updates) {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a))
    );
  }

  return (
    <AssignmentContext.Provider
      value={{ assignments, addAssignment, updateAssignment }}
    >
      {children}
    </AssignmentContext.Provider>
  );
}

export function useAssignments() {
  const context = useContext(AssignmentContext);
  if (!context) {
    throw new Error("useAssignments must be used within an AssignmentProvider");
  }
  return context;
}
