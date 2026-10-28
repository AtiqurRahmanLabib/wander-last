"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Destination } from "../../../types";

const PERKS = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];

type BookingCardProps = {
  destination: Destination;
};

export default function BookingCard({ destination }: BookingCardProps) {
  const { data: session } = authClient.useSession();
  const [departureDate, setDepartureDate] = useState(
    destination.departureDate?.slice(0, 10) ?? "",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!session?.user) {
      setError("Please sign in before booking.");
      return;
    }

    if (!departureDate) {
      setError("Please select a departure date.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: session.user.name,
          email: session.user.email,
          // imageUrl: session.user.imageUrl,
          destinationId: destination._id,
          destinationName: destination.destinationName,
          price: destination.price,
          departureDate,
          bookingDate: new Date().toISOString(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed.");
      }

      console.log("Booking successful:", result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <aside className="h-fit border border-zinc-200 bg-white p-6 lg:sticky lg:top-6">
      <p className="text-sm text-zinc-500">Starting from</p>

      <p className="mt-1 text-4xl font-bold text-sky-600">
        ${destination.price}
      </p>

      <p className="mt-1 text-xs text-zinc-500">per person</p>

      <form onSubmit={handleBooking}>
        <label
          htmlFor="destination-departure-date"
          className="mt-6 block text-sm font-medium text-zinc-700"
        >
          Departure date
        </label>

        <input
          id="destination-departure-date"
          className="mt-2 w-full border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700"
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          required
        />

        {error && (
          <p role="alert" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 flex w-full items-center justify-center gap-2 bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Booking..." : "Book Now"}
          {!isSubmitting && (
            <ArrowRight className="size-4" aria-hidden="true" />
          )}
        </button>
      </form>

      <ul className="mt-5 space-y-2.5">
        {PERKS.map((perk) => (
          <li
            key={perk}
            className="flex items-center gap-2.5 text-xs text-zinc-600"
          >
            <Check className="size-3.5 text-green-600" aria-hidden="true" />
            {perk}
          </li>
        ))}
      </ul>
    </aside>
  );
}
