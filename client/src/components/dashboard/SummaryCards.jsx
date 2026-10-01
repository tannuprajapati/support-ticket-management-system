import {
  Ticket,
  CircleDot,
  Clock3,
  CheckCircle2,
} from "lucide-react";

import SummaryCard from "./SummaryCard";

function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Total Tickets",
      value: summary.total,
      icon: Ticket,
      description: "All support requests",
      iconClassName: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Open",
      value: summary.open,
      icon: CircleDot,
      description: "Waiting for attention",
      iconClassName: "bg-blue-50 text-blue-600",
    },
    {
      title: "In Progress",
      value: summary.inProgress,
      icon: Clock3,
      description: "Currently being handled",
      iconClassName: "bg-amber-50 text-amber-600",
    },
    {
      title: "Resolved",
      value: summary.resolved,
      icon: CheckCircle2,
      description: "Successfully completed",
      iconClassName: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
}

export default SummaryCards;