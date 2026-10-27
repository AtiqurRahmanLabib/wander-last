import Image from "next/image";
import { Suspense } from "react";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import type { Destination } from "../../../types";
import Link from "next/link";

async function DestinationsList() {
  const res = await fetch("http://localhost:8000/destinations");

  if (!res.ok) {
    throw new Error("Failed to fetch destinations");
  }

  const destinations: Destination[] = await res.json();

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <article key={destination._id} className="group">
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={destination.imageUrl}
                  alt={destination.destinationName}
                  fill
                  sizes="(min-width: 1024px) 350px, (min-width: 640px) 100vw, 100vw"
                  quality={100}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span className="absolute right-3 top-3 flex items-center gap-1 bg-white px-2.5 py-1 text-xs font-semibold text-zinc-800">
                  <Star
                    className="size-3.5 fill-zinc-800 text-zinc-800"
                    aria-hidden
                  />
                  {destination.category}
                </span>
              </div>

              <div className="mt-4">
                <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <MapPin className="size-3.5" aria-hidden />
                  {destination.country}
                </p>

                <div className="mt-1.5 flex items-baseline justify-between gap-2">
                  <h2 className="text-xl font-semibold text-zinc-900">
                    {destination.destinationName}
                  </h2>

                  <p className="text-lg font-bold text-zinc-900">
                    ${destination.price}
                    <span className="text-xs font-normal text-zinc-500">
                      /Person
                    </span>
                  </p>
                </div>

                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-zinc-500">
                  <Calendar className="size-3.5" aria-hidden />
                  {destination.duration}
                </p>

                <Link
                  href={`/destinations/${destination._id}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 underline underline-offset-4 transition-colors hover:text-sky-800"
                >
                  BOOK NOW
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AllDestinationsPage() {
  return (
    <Suspense
      fallback={
        <p className="px-4 py-16 text-center text-zinc-500">
          Loading destinations...
        </p>
      }
    >
      <DestinationsList />
    </Suspense>
  );
}
