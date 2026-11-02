import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Destination } from "../../../types"

import FeaturedCarousel from "./featuredCarousel"

// The backend response has no rating field yet; the design shows a fixed one.
const FEATURED_RATING = 4.5

const FeaturedDestination = async () => {
  const res = await fetch("http://localhost:8000/featured-destination")

  if (!res.ok) {
    throw new Error("Failed to fetch featured destinations")
  }

  const destinations: Destination[] = await res.json()

  return (
    <section className="bg-zinc-50">
      <div className="mx-auto max-w-390 px-4 py-16 sm:px-6">
        <header className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
              Featured Destinations
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Handpicked travel experiences for the adventure seekers
            </p>
          </div>

          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 border border-cyan-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-cyan-600 transition-colors hover:bg-cyan-50"
          >
            All Destinations
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </header>

        <FeaturedCarousel destinations={destinations} rating={FEATURED_RATING} />
      </div>
    </section>
  )
}

export default FeaturedDestination
