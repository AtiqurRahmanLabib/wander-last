import type { Metadata } from "next"
import DestinationForm from "@/components/destination-form"

export const metadata: Metadata = {
  title: "Add New Travel Package | Wanderlast",
}

export default function AddDestination() {
  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pt-10 pb-16 sm:px-8">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
          Add New Travel Package
        </h1>

        <div className="mx-auto mt-10 max-w-[720px] rounded-md bg-white p-8 shadow-[0_10px_40px_rgba(15,23,42,0.08)]">
          <DestinationForm />
        </div>
      </div>
    </main>
  )
}
