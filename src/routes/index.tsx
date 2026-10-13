import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Templates } from "@/components/landing/Templates";
import { Pricing } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";
import { CTA } from "@/components/landing/CTA";
import { HowItWorks } from "@/components/landing/HowItWorks";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Features />

      <Templates />

      <HowItWorks />

      <Pricing />

      <FAQ />

      <CTA />

      <Footer />
    </>
  );
}
