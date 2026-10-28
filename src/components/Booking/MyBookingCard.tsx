import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, MapPin, Trash2 } from "lucide-react";
import type { Booking } from "../../../types";
import BookingStatusBadge from "./BookingStatusBadge";

const formatDate = (date: string) => {
  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

type BookingCardProps = {
  booking: Booking;
};

const MyBookingCard = ({ booking }: BookingCardProps) => {
  return (
    <article className="flex flex-col gap-5 border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5">
      <div className="relative aspect-16/10 w-full shrink-0 overflow-hidden bg-zinc-100 sm:aspect-auto sm:h-28 sm:w-44">
        {booking.imageUrl?.trim() ? (
          <Image
            src={booking.imageUrl}
            alt={booking.destinationName || "Destination"}
            fill
            sizes="(min-width: 640px) 176px, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            No image available
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <BookingStatusBadge status={booking.status} />

        <h3 className="mt-2 text-xl font-semibold text-zinc-900 sm:text-2xl">
          {booking.destinationName}
        </h3>

        <p className="mt-2 flex items-center gap-1.5 text-xs text-zinc-500">
          <Calendar className="size-3.5" aria-hidden />
          Departure: {formatDate(booking.departureDate)}
        </p>

        <p className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <MapPin className="size-3.5" aria-hidden />
          Booking ID: {booking._id}
        </p>

        <p className="mt-3 text-2xl font-bold text-sky-600">${booking.price}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 border border-red-300 px-4 py-2 text-sm text-red-500 transition-colors hover:bg-red-50"
        >
          <Trash2 className="size-4" aria-hidden />
          Cancel
        </button>

        <Link
          href={`/destinations/${booking.destinationId}`}
          className="inline-flex items-center gap-1.5 bg-teal-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-700"
        >
          <Eye className="size-4" aria-hidden />
          View
        </Link>
      </div>
    </article>
  );
};

export default MyBookingCard;
