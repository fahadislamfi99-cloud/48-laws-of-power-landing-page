"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import EditorialDissection from "@/components/EditorialDissection";
import DigitalReaderPreview from "@/components/DigitalReaderPreview";
import PsychologicalDiagnostic from "@/components/PsychologicalDiagnostic";
import LawsCodex from "@/components/LawsCodex";
import AuthorProfile from "@/components/AuthorProfile";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import AllLawsModal from "@/components/AllLawsModal";
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
    <main className="min-h-screen bg-[#F7F5EE] text-[#121316] selection:bg-[#111215] selection:text-[#F7F5EE]">
      {/* 1. Minimalist Editorial Header */}
      <Header onOpenOrderModal={handleOpenOrderModal} />

      {/* 2. Hero Section with Editorial Thesis & Multi-Device Showcase */}
      <Hero onOpenOrderModal={handleOpenOrderModal} />

      {/* 3. Digital Trust Bar */}
      <TrustBadges />

      {/* 4. Editorial Dissection: Why Power Dynamics Matter */}
      <EditorialDissection onOpenOrderModal={handleOpenOrderModal} />

      {/* 5. Live Interactive Digital PDF Reader */}
      <DigitalReaderPreview onOpenOrderModal={handleOpenOrderModal} />

      {/* 6. Strategic Power Diagnostic (Interactive 3 Dilemmas) */}
      <PsychologicalDiagnostic onOpenOrderModal={handleOpenOrderModal} />

      {/* 7. The 48 Laws Codex & Almanac */}
      <LawsCodex
        onOpenAllLawsModal={handleOpenAllLawsModal}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* 8. Author Profile & Reader Notes */}
      <AuthorProfile />

      {/* 9. FAQ Section */}
      <FAQSection />

      {/* 10. Final Conversion Section & Checkout */}
      <FinalCTA />

      {/* 11. Footer */}
      <Footer />

      {/* Sticky Mobile Download Bar */}
      <StickyMobileCTA onOpenOrderModal={handleOpenOrderModal} />

      {/* All Laws Modal */}
      <AllLawsModal
        isOpen={isAllLawsModalOpen}
        onClose={handleCloseAllLawsModal}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* Digital Order & Download Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
      />
    </main>
  );
}
