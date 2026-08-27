"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EditorialHero from "@/components/EditorialHero";
import HumanRecognition from "@/components/HumanRecognition";
import DeepDiveLaw from "@/components/DeepDiveLaw";
import CuriosityBridge from "@/components/CuriosityBridge";
import PdfSamplePreview from "@/components/PdfSamplePreview";
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

  return (
    <main className="min-h-screen bg-[#08080A] text-[#F0EBE0] selection:bg-[#C8A45C] selection:text-[#08080A]">
      <Navbar onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <EditorialHero onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <HumanRecognition />
      <DeepDiveLaw />
      <CuriosityBridge onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <PdfSamplePreview onOpenOrderModal={() => setIsOrderModalOpen(true)} />
      <LawsAlmanac
        onOpenAllLawsModal={() => setIsAllLawsModalOpen(true)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />
      <AuthorProfile />
      <DigitalCheckout />
      <ProductFAQ />
      <EditorialFooter />
      <MobileStickyBar onOpenOrderModal={() => setIsOrderModalOpen(true)} />

      <AllLawsModal
        isOpen={isAllLawsModalOpen}
        onClose={() => setIsAllLawsModalOpen(false)}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
      />
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
      />
    </main>
  );
}
