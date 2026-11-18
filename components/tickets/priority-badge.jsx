// Coloured badge for a ticket priority.
const PRIORITY_STYLES = {
  Low: "bg-slate-100 text-slate-700 ring-slate-200",
  Medium: "bg-sky-50 text-sky-700 ring-sky-200",
  High: "bg-rose-50 text-rose-700 ring-rose-200",
};

export default function PriorityBadge({ priority }) {
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low;

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}
    >
      {priority}
    </span>
  );
}
