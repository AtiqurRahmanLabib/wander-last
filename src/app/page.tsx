import { Suspense } from "react";
import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import FeaturedDestination from "@/components/home/featuredDestination";
import Features from "@/components/home/features";

import Testimonials from "@/components/home/testimonials";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Banner />
      {/* FeaturedDestination fetches at runtime; under cacheComponents a
          dynamic fetch in a static route must stream in via Suspense. */}
      <Suspense fallback={<p className="px-4 py-16 text-center text-zinc-500">Loading featured destinations...</p>}>
        <FeaturedDestination />
      </Suspense>
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}
