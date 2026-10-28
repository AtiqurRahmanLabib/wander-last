import Image from "next/image"
import { ArrowRight } from "lucide-react"
import cta from '../../../public/assets/CTA.png'
import Link from "next/link"

export default function Cta() {
  return (
    <section className="relative isolate flex min-h-110 flex-col flex-1 items-center justify-center overflow-hidden px-4 text-center">
      <Image
        src={cta}
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/35 to-black/60" />

      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-[44px]">
        Ready To Start Your Journey?
      </h2>
      <p className="mt-3 max-w-xl text-sm text-white/85">
        Join thousands of travelers who have discovered the world with us
      </p>

      <Link
        href="/destinations"
        className="mt-8 inline-flex items-center gap-4 rounded-md bg-white px-8 py-4 text-sm font-semibold tracking-wide text-zinc-900 uppercase transition-colors hover:bg-zinc-200"
      >
        Book Your Trip Today
        <ArrowRight className="size-4" aria-hidden />
      </Link>
    </section>
  )
}
