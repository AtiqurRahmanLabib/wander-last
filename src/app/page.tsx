import Banner from "@/components/banner"
import Cta from "@/components/cta"
import Features from "@/components/features"
import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import Testimonials from "@/components/testimonials"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Navbar />
      <Banner />
      <Features />
      <Testimonials />
      <Cta />
      <Footer />
    </div>
  )
}
