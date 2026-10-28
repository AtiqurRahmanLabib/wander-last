import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const searchFields = [
  { name: "location", label: "Location", placeholder: "Address, City Or Zip" },
  { name: "dates", label: "Date/Duration", placeholder: "Anytime / 3 Days" },
  { name: "budget", label: "Budget", placeholder: "$0-$3000" },
  { name: "people", label: "People", placeholder: "5-10" },
];

export default function Banner() {
  return (
    <section className="relative isolate flex min-h-155 flex-1 flex-col overflow-hidden">
      <Image
        src="/assets/Banner.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/40 via-black/20 to-black/50" />

      {/* Headline + CTAs */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-16 pb-20 text-center">
        <h1 className="max-w-4xl text-4xl leading-[1.1] font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Discover Your
          <br /> Next Adventure
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-3 rounded-md bg-sky-500 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase transition-colors hover:bg-sky-600"
          >
            Explore Now
            <span className="rounded-sm bg-black/20 p-1">
              <ArrowRight className="size-4" aria-hidden />
            </span>
          </Link>
          <Link
            href="/destinations"
            className="rounded-md border border-white/30 bg-white/15 px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase backdrop-blur-sm transition-colors hover:bg-white/25"
          >
            View Destination
          </Link>
        </div>
      </div>

      {/* Search bar */}
      <form className="grid w-full grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-[repeat(4,minmax(0,1fr))_auto]">
        {searchFields.map((field) => (
          <label
            key={field.name}
            htmlFor={field.name}
            className="flex cursor-text flex-col justify-center gap-1 bg-black/55 px-6 py-4 backdrop-blur-sm"
          >
            <span className="text-sm font-semibold text-white">
              {field.label}
            </span>
            <input
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              className="w-full bg-transparent text-[13px] text-white outline-none placeholder:text-white/55"
            />
          </label>
        ))}
        <button
          type="submit"
          className="bg-sky-500 px-10 py-4 text-[15px] font-medium text-white transition-colors hover:bg-sky-600"
        >
          Search
        </button>
      </form>
    </section>
  );
}
