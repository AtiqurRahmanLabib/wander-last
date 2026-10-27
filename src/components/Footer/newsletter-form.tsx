"use client"

import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")

  return (
    <form
      className="relative mt-4 max-w-[300px]"
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Enter email"
        className="h-11 w-full rounded-sm border border-zinc-700 bg-transparent pl-4 pr-12 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-zinc-500"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-zinc-300 transition-colors hover:text-white"
      >
        <ArrowUpRight className="size-4" aria-hidden />
      </button>
    </form>
  )
}
