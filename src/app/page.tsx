import Banner from "@/components/home/banner";
import Cta from "@/components/home/cta";
import Features from "@/components/home/features";

import Testimonials from "@/components/home/testimonials";

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
