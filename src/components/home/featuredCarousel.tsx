"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { Destination } from "../../../types";

type FeaturedCarouselProps = {
  destinations: Destination[];
  rating: number;
};

export default function FeaturedCarousel({
  destinations,
  rating,
}: FeaturedCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setCurrent(api.selectedScrollSnap() + 1);
      setCount(api.scrollSnapList().length);
    };

    api.on("init", sync);
    api.on("reInit", sync);
    api.on("select", sync);

    return () => {
      api.off("init", sync);
      api.off("reInit", sync);
      api.off("select", sync);
    };
  }, [api]);

  if (destinations.length === 0) {
    return (
      <p className="mt-10 text-sm text-zinc-500">
        No featured destinations yet. Check back soon.
      </p>
    );
  }

  const progress = count > 0 ? (current / count) * 100 : 0;

  return (
    <>
      <div className="">
        <Carousel setApi={setApi} opts={{ align: "start" }} className="mt-10">
          <CarouselContent>
            {destinations.map((destination) => (
              <CarouselItem
                key={destination._id}
                className="basis-full sm:basis-[calc(50%-8px)] lg:basis-[calc(46%-8px)]"
              >
                <article className="group">
                  <div className="relative aspect-3/2  overflow-hidden">
                    <Image
                      src={destination.imageUrl}
                      alt={destination.destinationName}
                      fill
                      sizes="(min-width: 1120px) 46vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <span className="absolute right-3 top-3 flex items-center gap-1 bg-white px-2 py-1 text-xs font-semibold text-zinc-900">
                      {rating}
                      <Star
                        className="size-3 fill-zinc-900 text-zinc-900"
                        aria-hidden
                      />
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <MapPin className="size-3.5" aria-hidden />
                      {destination.country}
                    </p>

                    <div className="mt-1.5 flex items-baseline justify-between gap-4">
                      <h3 className="text-2xl font-semibold tracking-tight text-zinc-900">
                        {destination.destinationName}
                      </h3>

                      <p className="text-xl font-bold text-zinc-900">
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
                      className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-cyan-600 transition-colors hover:text-cyan-700"
                    >
                      Book Now
                      <ArrowUpRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-10 flex items-center gap-6">
          <p className="shrink-0 text-sm text-zinc-700">
            {count > 0 ? `${current}/${count}` : "\u2026"}
          </p>

          <div className="relative h-px flex-1 bg-zinc-200">
            <span
              className="absolute inset-y-0 left-0 bg-zinc-500 transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              aria-label="Previous destinations"
              onClick={() => api?.scrollPrev()}
              disabled={current <= 1}
              className="flex size-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>

            <button
              type="button"
              aria-label="Next destinations"
              onClick={() => api?.scrollNext()}
              disabled={count === 0 || current >= count}
              className="flex size-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
