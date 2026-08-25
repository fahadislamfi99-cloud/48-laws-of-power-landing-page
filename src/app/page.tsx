"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EditorialHero from "@/components/EditorialHero";
import HumanRecognition from "@/components/HumanRecognition";
import DeepDiveLaw from "@/components/DeepDiveLaw";
import CuriosityBridge from "@/components/CuriosityBridge";
import DigitalProductShowcase from "@/components/DigitalProductShowcase";
import LawsAlmanac from "@/components/LawsAlmanac";
import AuthorProfile from "@/components/AuthorProfile";
import DigitalCheckout from "@/components/DigitalCheckout";
import ProductFAQ from "@/components/ProductFAQ";
import EditorialFooter from "@/components/EditorialFooter";
import MobileStickyBar from "@/components/MobileStickyBar";
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
    <main className="min-h-screen bg-[#FAF8F5] text-[#121316] selection:bg-[#121316] selection:text-[#FAF8F5]">
      {/* 1. Minimalist Editorial Navigation */}
      <Navbar onOpenOrderModal={handleOpenOrderModal} />

      {/* 2. Editorial Hero (Curiosity + Digital PDF Showcase) */}
      <EditorialHero onOpenOrderModal={handleOpenOrderModal} />

      {/* 3. Recognition: Real Everyday Situations */}
      <HumanRecognition />

      {/* 4. Education: Deep Dive on Flagship Laws (Real Value Delivery) */}
      <DeepDiveLaw />

      {/* 5. Curiosity Bridge: Transition from 1 Law to the Full 48 Laws */}
      <CuriosityBridge onOpenOrderModal={handleOpenOrderModal} />

      {/* 6. Digital Product & Interactive Reading Preview */}
      <DigitalProductShowcase onOpenOrderModal={handleOpenOrderModal} />

      {/* 7. The 48 Laws Almanac / Index */}
      <LawsAlmanac
        onOpenAllLawsModal={handleOpenAllLawsModal}
        onOpenOrderModal={handleOpenOrderModal}
      />

      {/* 8. Meet the Author */}
      <AuthorProfile />

      {/* 9. Frictionless Digital Purchase & Download Section */}
      <DigitalCheckout />

      {/* 10. Frequently Asked Questions */}
      <ProductFAQ />

      {/* 11. Minimalist Publishing Footer */}
      <EditorialFooter />

      {/* Mobile Bottom Conversion Pill */}
      <MobileStickyBar onOpenOrderModal={handleOpenOrderModal} />

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
    </main>
  );
}
