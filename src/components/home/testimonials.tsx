"use client"

import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    image: "/assets/person1.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    image: "/assets/person2.png",
  },
  {
    quote:
      "The Santorini Getaway Was Everything We Dreamed Of! The Sunset Cruises And Private Cave Tours Made It A Trip We Will Never Forget.",
    name: "Priya Patel",
    location: "Mumbai, India",
    image: "https://i.pravatar.cc/500?img=32",
  },
  {
    quote:
      "Our Tokyo Tour Was The Perfect Mix Of Tradition And Modernity. Seamless Planning And Unmatched Local Insight From Start To Finish.",
    name: "David Okafor",
    location: "London, UK",
    image: "https://i.pravatar.cc/500?img=59",
  },
]

const VISIBLE_COUNT = 2

export default function Testimonials() {
  const [start, setStart] = useState(0)
  const maxStart = testimonials.length - VISIBLE_COUNT
  const visible = testimonials.slice(start, start + VISIBLE_COUNT)

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-280 px-4 py-16 sm:px-6">
        <header className="flex items-center justify-between gap-6">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
              What Travelers Say
            </h2>
            <p className="mt-3 text-sm text-zinc-500">
              Real experiences from our happy travelers
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() => setStart(Math.max(0, start - 1))}
              disabled={start === 0}
              className="flex size-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft className="size-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() => setStart(Math.min(maxStart, start + 1))}
              disabled={start === maxStart}
              className="flex size-10 items-center justify-center rounded-full border border-zinc-300 text-zinc-600 transition-colors hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowRight className="size-4" aria-hidden />
            </button>
          </div>
        </header>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {visible.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex overflow-hidden border border-zinc-200 bg-white"
            >
              <div className="flex flex-1 flex-col p-6">
                <blockquote className="text-[17px] leading-relaxed font-medium text-zinc-900">
                  &quot;{testimonial.quote}&quot;
                </blockquote>
                <figcaption className="mt-auto pt-6">
                  <span className="text-sm font-medium text-sky-600">
                    &mdash; {testimonial.name}
                  </span>
                  <p className="mt-1 text-xs text-zinc-500">
                    {testimonial.location}
                  </p>
                </figcaption>
              </div>
              <div className="relative w-[45%] shrink-0">
                <Image
                  src={testimonial.image}
                  alt={`Photo of ${testimonial.name}`}
                  fill
                  sizes="(min-width: 768px) 250px, 45vw"
                  className="object-cover"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
