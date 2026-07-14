import Hero from "@/components/home/Hero";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import HowItWorks from "@/components/home/HowItWorks";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function Page() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
}