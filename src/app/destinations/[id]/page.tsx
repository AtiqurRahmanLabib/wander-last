import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowLeft, Calendar, Check, MapPin, Star } from "lucide-react";
import type { Destination } from "../../../../types";
import EditDestinationDialog from "@/components/destination/EditDestinationDialog";
import DeleteDestination from "@/components/destination/DeleteDestination";
import BookingCard from "@/components/Booking/BookingCard";

const HIGHLIGHTS = [
  "Luxury beachfront accommodation",
  "Visit Uluwatu Temple at sunset",
  "Traditional Balinese spa treatment",
  "Private beach dinner experience",
  "Sunrise trek to Mount Batur",
];

async function DestinationDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`http://localhost:8000/destination/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch destination");
  }

  const destination: Destination = await res.json();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-10 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to Destinations
          </Link>

          <div className="flex items-center gap-3">
            <EditDestinationDialog
              destination={destination}
            ></EditDestinationDialog>
            <DeleteDestination destination={destination}></DeleteDestination>
          </div>
        </div>

        <div className="relative mt-6 aspect-16/10 overflow-hidden">
          <Image
            src={destination.imageUrl}
            alt={destination.destinationName}
            fill
            sizes="(min-width: 1120px) 1100px, 100vw"
            quality={100}
            className="object-cover"
            priority
          />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="flex items-center gap-1.5 text-xs text-zinc-500">
              <MapPin className="size-3.5" aria-hidden />
              {destination.country}
            </p>

            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
              {destination.destinationName}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-1.5 text-sm text-zinc-700">
                <Star
                  className="size-4 fill-green-600 text-green-600"
                  aria-hidden
                />
                <strong className="font-semibold">4.9</strong>
                <span className="text-zinc-500">(234 reviews)</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm text-zinc-700">
                <Calendar className="size-4" aria-hidden />
                {destination.duration}
              </span>
            </div>

            <h2 className="mt-8 text-xl font-medium text-zinc-900">Overview</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {destination.description}
            </p>

            <h2 className="mt-8 text-xl font-medium text-zinc-900">
              Highlights
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {destination.description}
            </p>

            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-center gap-2.5 text-sm text-zinc-700"
                >
                  <Check
                    className="size-4 shrink-0 text-green-600"
                    aria-hidden
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <BookingCard destination={destination}></BookingCard>
        </div>
      </div>
    </div>
  );
}

export default async function DestinationDetailsPage(
  props: PageProps<"/destinations/[id]">,
) {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-16 text-center text-zinc-500">
          Loading destination...
        </p>
      }
    >
      <DestinationDetails params={props.params} />
    </Suspense>
  );
}
