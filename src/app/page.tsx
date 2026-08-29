"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import EditorialHero from "@/components/EditorialHero";
import HumanRecognition from "@/components/HumanRecognition";
import DeepDiveLaw from "@/components/DeepDiveLaw";
import VideoLessonSection from "@/components/VideoLessonSection";
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
import PromotionalPopup from "@/components/PromotionalPopup";
import ExitIntentLessonModal from "@/components/ExitIntentLessonModal";
import BackToTop from "@/components/BackToTop";
import Preloader from "@/components/Preloader";
import ScrollRevealInit from "@/components/ScrollRevealInit";

export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAllLawsModalOpen, setIsAllLawsModalOpen] = useState(false);
  const [initialCouponCode, setInitialCouponCode] = useState<string | undefined>(undefined);

  const handleOpenOrderModal = (coupon?: string) => {
    setInitialCouponCode(coupon);
    setIsOrderModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#08080A] text-[#F0EBE0] selection:bg-[#C8A45C] selection:text-[#08080A]">
      <Preloader onComplete={() => setIsPreloaderDone(true)} />
      <ScrollRevealInit />
      <Navbar onOpenOrderModal={() => handleOpenOrderModal()} />
      <EditorialHero
        onOpenOrderModal={() => handleOpenOrderModal()}
        isPreloaderDone={isPreloaderDone}
      />
      <HumanRecognition />
      <DeepDiveLaw />
      <VideoLessonSection onOpenOrderModal={() => handleOpenOrderModal()} />
      <CuriosityBridge onOpenOrderModal={() => handleOpenOrderModal()} />
      <PdfSamplePreview onOpenOrderModal={() => handleOpenOrderModal()} />
      <LawsAlmanac
        onOpenAllLawsModal={() => setIsAllLawsModalOpen(true)}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />
      <AuthorProfile />
      <DigitalCheckout />
      <ProductFAQ />
      <EditorialFooter />
      <MobileStickyBar onOpenOrderModal={() => handleOpenOrderModal()} />
      <BackToTop />

      <AllLawsModal
        isOpen={isAllLawsModalOpen}
        onClose={() => setIsAllLawsModalOpen(false)}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />
      
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        initialCouponCode={initialCouponCode}
      />

      <PromotionalPopup
        onClaimOffer={(couponCode) => handleOpenOrderModal(couponCode)}
      />

      <ExitIntentLessonModal
        onClaimOffer={(couponCode) => handleOpenOrderModal(couponCode)}
      />
    </main>
  );
}
