import Banner from "@/components/banner";
import Cta from "@/components/cta";
import Features from "@/components/features";

import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Banner />
      <Features />
      <Testimonials />
      <Cta />
    </div>
  );
}
