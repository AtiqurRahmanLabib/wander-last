import Image from "next/image"

const features = [
  {
    icon: "ShieldCheck",
    title: "Safe & Secure",
    body: "Your safety is our priority with comprehensive travel insurance and 24/7 protection.",
  },
  {
    icon: "MapTrifold",
    title: "Expert Guides",
    body: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "Headset",
    title: "24/7 Support",
    body: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export default function Features() {
  return (
    <section className="relative border-b border-zinc-400/60 bg-[#ddf3f4]">
      {/* Soft glow behind the heading, as in the reference design */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,246,220,0.55),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-280 px-4 pt-16 pb-20 sm:px-6">
        <header className="text-center">
          <h2 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-[44px]">
            Why Choose Wanderlust
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Your trusted partner for exceptional travel experiences
          </p>
        </header>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <Image
                src={`/assets/${feature.icon}.png`}
                alt=""
                width={28}
                height={28}
                aria-hidden
              />
              <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
