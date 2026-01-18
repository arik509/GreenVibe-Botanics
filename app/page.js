"use client";
import { useEffect, useState } from "react";
import HeroSection from "@/components/home/HeroSection";
import MissionSection from "@/components/home/MissionSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import CommitmentSection from "@/components/home/CommitmentSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  const [storeInfo, setStoreInfo] = useState(null);

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setStoreInfo(data.storeInfo))
      .catch((err) => console.error("Error loading store info:", err));
  }, []);

  return (
    <div className="bg-white">
      <HeroSection />
      <MissionSection storeInfo={storeInfo} />
      <FeaturesSection />
      <StatsSection />
      <CategoriesSection />
      <TestimonialsSection />
      <NewsletterSection />
      <CommitmentSection />
      <CTASection />
    </div>
  );
}
