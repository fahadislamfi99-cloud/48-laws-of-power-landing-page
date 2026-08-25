"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HookSection from "@/components/HookSection";
import InteractiveLaws from "@/components/InteractiveLaws";
import AllLawsModal from "@/components/AllLawsModal";
import PowerLesson from "@/components/PowerLesson";
import ValueProposition from "@/components/ValueProposition";
import SocialSituations from "@/components/SocialSituations";
import AudienceAndFeatures from "@/components/AudienceAndFeatures";
import BookPreview from "@/components/BookPreview";
import AuthorAndReviews from "@/components/AuthorAndReviews";
import TrustBadges from "@/components/TrustBadges";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Footer from "@/components/Footer";
import OrderModal from "@/components/OrderModal";

export default function Home() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAllLawsModalOpen, setIsAllLawsModalOpen] = useState(false);

  const handleOpenOrderModal = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleOpenAllLawsModal = () => {
    setIsAllLawsModalOpen(true);
  };

  const handleCloseAllLawsModal = () => {
    setIsAllLawsModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-stone-900 selection:bg-amber-400 selection:text-black">
      {/* Top Fixed Header */}
      <Header onOpenOrderModal={handleOpenOrderModal} />

      {/* Hero Section (Dark Luxury with 3D Book) */}
      <Hero onOpenOrderModal={handleOpenOrderModal} />

      {/* Psychological Hook Section (Warm Cream with Chess King) */}
      <HookSection />

      {/* Interactive 6 Laws Grid */}
      <InteractiveLaws
        onOpenAllLawsModal={handleOpenAllLawsModal}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Interactive Power Lesson Scenario */}
      <PowerLesson onOpenOrderModal={handleOpenOrderModal} />

      {/* Value Proposition / 6 Dimensions */}
      <ValueProposition />

      {/* Social Situation Realities */}
      <SocialSituations />

      {/* 3-Column Core Block: Audience / Specs / Pricing Card */}
      <AudienceAndFeatures onOpenOrderModal={handleOpenOrderModal} />

      {/* Book Inside Look & Preview */}
      <BookPreview onOpenOrderModal={handleOpenOrderModal} />

      {/* Author Biography & Reader Reviews */}
      <AuthorAndReviews />

      {/* 4 Trust Badges Strip */}
      <TrustBadges />

      {/* 10 FAQ Items Accordion */}
      <FAQSection />

      {/* Final Bottom CTA with Embedded Order Form */}
      <FinalCTA />

      {/* Minimal Editorial Footer */}
      <Footer />

      {/* Modals */}
      <AllLawsModal
        isOpen={isAllLawsModalOpen}
        onClose={handleCloseAllLawsModal}
        onOpenOrderModal={handleOpenOrderModal}
      />

      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
      />

      {/* Floating Sticky Mobile CTA */}
      <StickyMobileCTA onOpenOrderModal={handleOpenOrderModal} />
    </main>
  );
}
