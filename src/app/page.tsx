"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import EditorialHero from "@/components/EditorialHero";
import HumanRecognition from "@/components/HumanRecognition";
import DeepDiveLaw from "@/components/DeepDiveLaw";
import VideoLessonSection from "@/components/VideoLessonSection";
import CuriosityBridge from "@/components/CuriosityBridge";
import DualMasterySection from "@/components/DualMasterySection";
import AuthorProfile from "@/components/AuthorProfile";
import DigitalCheckout from "@/components/DigitalCheckout";
import ProductFAQ from "@/components/ProductFAQ";
import EditorialFooter from "@/components/EditorialFooter";
import MobileStickyBar from "@/components/MobileStickyBar";
import Preloader from "@/components/Preloader";
import ScrollRevealInit from "@/components/ScrollRevealInit";

// Dynamic Code Splitting for Heavy Interactive Below-the-Fold Features & Overlays
const PdfSamplePreview = dynamic(() => import("@/components/PdfSamplePreview"), { ssr: false });
const LawsAlmanac = dynamic(() => import("@/components/LawsAlmanac"), { ssr: false });
const AllLawsModal = dynamic(() => import("@/components/AllLawsModal"), { ssr: false });
const OrderModal = dynamic(() => import("@/components/OrderModal"), { ssr: false });
const SeductionLessonModal = dynamic(() => import("@/components/SeductionLessonModal"), { ssr: false });
const PromotionalPopup = dynamic(() => import("@/components/PromotionalPopup"), { ssr: false });
const ExitIntentLessonModal = dynamic(() => import("@/components/ExitIntentLessonModal"), { ssr: false });
const BackToTop = dynamic(() => import("@/components/BackToTop"), { ssr: false });
const LiveOrderToast = dynamic(() => import("@/components/LiveOrderToast"), { ssr: false });

export default function Home() {
  const [isPreloaderDone, setIsPreloaderDone] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAllLawsModalOpen, setIsAllLawsModalOpen] = useState(false);
  const [isSeductionLessonModalOpen, setIsSeductionLessonModalOpen] = useState(false);
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
      <DualMasterySection
        onOpenOrderModal={() => handleOpenOrderModal()}
        onOpenSeductionLessonModal={() => setIsSeductionLessonModalOpen(true)}
      />
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

      <SeductionLessonModal
        isOpen={isSeductionLessonModalOpen}
        onClose={() => setIsSeductionLessonModalOpen(false)}
        onOpenOrderModal={() => handleOpenOrderModal()}
      />

      <PromotionalPopup
        onClaimOffer={(couponCode) => handleOpenOrderModal(couponCode)}
      />

      <ExitIntentLessonModal
        onClaimOffer={(couponCode) => handleOpenOrderModal(couponCode)}
      />

      <LiveOrderToast
        onOpenOrderModal={() => handleOpenOrderModal()}
      />
    </main>
  );
}
