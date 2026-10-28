import { CircleCheck, Clock } from "lucide-react";

type BookingStatusBadgeProps = {
  status?: string;
};

const STATUS_STYLES: Record<
  string,
  { icon: typeof CircleCheck; classes: string }
> = {
  Confirmed: {
    icon: CircleCheck,
    classes: "bg-green-50 text-green-700",
  },
  Pending: {
    icon: Clock,
    classes: "bg-amber-50 text-amber-700",
  },
};

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {
  const normalized = status?.trim()
    ? status.trim().charAt(0).toUpperCase() +
      status.trim().slice(1).toLowerCase()
    : "Pending";

  const style = STATUS_STYLES[normalized] ?? {
    icon: Clock,
    classes: "bg-zinc-100 text-zinc-600",
  };

  const Icon = style.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium ${style.classes}`}
    >
      <Icon className="size-3.5" aria-hidden />
      {normalized}
    </span>
  );
};

export default BookingStatusBadge;
