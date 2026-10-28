import { Suspense } from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import MyBookingCard from "@/components/Booking/MyBookingCard";
import type { Booking } from "../../../types";

async function BookingsList() {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });

  const user = session?.user;

  if (!user?.email) {
    return (
      <p className="text-sm text-zinc-500">
        Sign in to see your upcoming travel plans.
      </p>
    );
  }

  const res = await fetch(`http://localhost:8000/my-booking/${user.email}`);

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const myBookings: Booking[] = await res.json();

  if (myBookings.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        You have no bookings yet. Explore our destinations to book your next
        trip.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {myBookings.map((booking) => (
        <MyBookingCard key={booking._id} booking={booking} />
      ))}
    </div>
  );
}

const MyBookingPage = () => {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900">
          My Bookings
        </h1>
        <p className="mt-2 text-sm text-zinc-500">
          Manage and view your upcoming travel plans
        </p>

        <div className="mt-8">
          <Suspense
            fallback={
              <p className="text-sm text-zinc-500">Loading bookings...</p>
            }
          >
            <BookingsList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default MyBookingPage;
