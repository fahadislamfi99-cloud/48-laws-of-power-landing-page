"use client";

import React, { useState, useEffect } from "react";
import { siteConfig, bangladeshDistricts } from "@/data/siteConfig";
import {
  trackInitiateCheckout,
  trackPurchase,
  trackLead,
} from "@/lib/pixel";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Truck,
  ShieldCheck,
  Phone,
  User,
  MapPin,
  Building,
  Plus,
  Minus,
  Check,
  ShoppingBag,
} from "lucide-react";

interface OrderFormProps {
  onSuccess?: () => void;
}

export default function OrderForm({ onSuccess }: OrderFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("ঢাকা বিভাগ");
  const [selectedDistrict, setSelectedDistrict] = useState("ঢাকা");
  const [deliveryArea, setDeliveryArea] = useState<"inside" | "outside">("inside");
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const deliveryCharge = siteConfig.freeDeliveryPromo
    ? 0
    : deliveryArea === "inside"
    ? siteConfig.deliveryChargeDhaka
    : siteConfig.deliveryChargeOutside;

  const itemTotal = siteConfig.price * quantity;
  const grandTotal = itemTotal + deliveryCharge;

  useEffect(() => {
    trackInitiateCheckout(grandTotal);
  }, []);

  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const div = e.target.value;
    setSelectedDivision(div);
    const districts = bangladeshDistricts[div] || [];
    if (districts.length > 0) {
      setSelectedDistrict(districts[0]);
    }
    if (div === "ঢাকা বিভাগ") {
      setDeliveryArea("inside");
    } else {
      setDeliveryArea("outside");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert("অনুগ্রহ করে আপনার নাম, মোবাইল নম্বর এবং সম্পূর্ণ ঠিকানা সঠিকভাবে পূরণ করুন।");
      return;
    }

    if (phone.trim().length < 11) {
      alert("অনুগ্রহ করে একটি সঠিক ১১ ডিজিটের মোবাইল নম্বর প্রদান করুন।");
      return;
    }

    setIsSubmitting(true);

    const generatedOrderId = "LP-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedOrderId);

    trackLead(phone);
    trackPurchase(grandTotal, generatedOrderId);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      try {
        confetti({
          particleCount: 90,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (err) {
        console.log(err);
      }

      if (onSuccess) onSuccess();
    }, 700);
  };

  if (isSuccess) {
    return (
      <div className="p-7 sm:p-10 text-center space-y-6 bg-white rounded-3xl border border-emerald-300 shadow-xl animate-fadeIn">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">
            অর্ডার সফল হয়েছে
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#141518]">
            ধন্যবাদ, {name}!
          </h3>
          <p className="text-[#555760] text-sm max-w-md mx-auto">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের টিম থেকে কল করে ডেলিভারি নিশ্চিত করা হবে।
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E5DCBE] text-left max-w-md mx-auto space-y-2.5 text-xs sm:text-sm">
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">অর্ডার আইডি:</span>
            <span className="font-mono font-bold text-[#141518]">{orderId}</span>
          </div>
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">বই:</span>
            <span className="font-medium text-[#141518]">The 48 Laws of Power (বাংলা) x {quantity}</span>
          </div>
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">মোবাইল নম্বর:</span>
            <span className="font-medium text-[#141518]">{phone}</span>
          </div>
          <div className="flex justify-between border-b border-[#EFE8DA] pb-2">
            <span className="text-stone-500">ডেলিভারি ঠিকানা:</span>
            <span className="font-medium text-[#141518] text-right">{address}, {selectedDistrict}, {selectedDivision}</span>
          </div>
          <div className="flex justify-between pt-1 text-base font-bold text-[#7A5B22]">
            <span>সর্বমোট প্রদেয়:</span>
            <span>{siteConfig.currencySymbol}{grandTotal}</span>
          </div>
        </div>

        <div className="pt-2">
          <p className="text-xs text-stone-500">
            ★ বই হাতে পেয়ে ডেলিভারিম্যানকে টাকা পরিশোধ করবেন (ক্যাশ অন ডেলিভারি)।
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl p-6 sm:p-9 border border-[#E5DCBE] shadow-xl space-y-6 text-stone-900"
    >
      {/* Form Header */}
      <div className="space-y-1.5 pb-4 border-b border-[#EFE8DA]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl sm:text-2xl font-bengali-serif font-bold text-[#141518]">
            অর্ডার ফর্ম (ক্যাশ অন ডেলিভারি)
          </h3>
          <span className="text-[11px] bg-[#FAF6EE] text-[#7A5B22] border border-[#DFCFA8] font-bold px-3 py-1 rounded-full">
            ১০০% নিরাপদ
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#5A5C64]">
          নিচের তথ্যগুলো পূরণ করে অর্ডার কনফার্ম করুন। বই পেয়ে টাকা পরিশোধ করবেন।
        </p>
      </div>

      {/* Name Field */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
          আপনার পুরো নাম <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            required
            placeholder="যেমন: মোঃ সাকিব হাসান"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Phone Field */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
          মোবাইল নম্বর <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="tel"
            required
            placeholder="যেমন: 017XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Division & District Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
            বিভাগ <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <select
              value={selectedDivision}
              onChange={handleDivisionChange}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] cursor-pointer"
            >
              {Object.keys(bangladeshDistricts).map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
            জেলা <span className="text-rose-500">*</span>
          </label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] cursor-pointer"
          >
            {(bangladeshDistricts[selectedDivision] || []).map((dst) => (
              <option key={dst} value={dst}>
                {dst}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Detailed Address */}
      <div className="space-y-1.5">
        <label className="block text-xs sm:text-sm font-bold text-[#2C2D32]">
          সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <textarea
            required
            rows={2}
            placeholder="যেমন: বাসা নং ১২, রোড ৪, সেক্টর ১০, উত্তরা, ঢাকা"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#D5C7A8] bg-[#FFFDF9] text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#C59B4B] focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-[#E5DCBE]">
        <div>
          <span className="text-xs sm:text-sm font-bold text-[#141518] block">
            বইয়ের সংখ্যা (Quantity)
          </span>
          <span className="text-[11px] text-stone-500">
            মূল্য: {siteConfig.currencySymbol}{siteConfig.price} / কপি
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-lg bg-white border border-[#D5C7A8] flex items-center justify-center text-stone-700 hover:bg-[#FAF6EE] cursor-pointer transition-colors shadow-2xs"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-mono font-bold text-base w-4 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-lg bg-white border border-[#D5C7A8] flex items-center justify-center text-stone-700 hover:bg-[#FAF6EE] cursor-pointer transition-colors shadow-2xs"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Order Summary Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#FAF6EE] to-[#F5EFE4] border border-[#DFCFA8] space-y-2.5 text-xs sm:text-sm">
        <div className="flex justify-between text-stone-600">
          <span>বইয়ের মূল্য ({quantity}টি কপি):</span>
          <span className="font-mono font-bold text-stone-900">{siteConfig.currencySymbol}{itemTotal}</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>ডেলিভারি চার্জ:</span>
          <span className="font-bold text-emerald-700">
            {deliveryCharge === 0 ? "ফ্রি (সীমিত সময়ের অফার)" : `${siteConfig.currencySymbol}${deliveryCharge}`}
          </span>
        </div>
        <div className="flex justify-between pt-2.5 border-t border-[#EAE0CD] text-base font-black text-[#141518]">
          <span>সর্বমোট প্রদেয়:</span>
          <span className="text-[#7A5B22] font-serif text-lg">{siteConfig.currencySymbol}{grandTotal}</span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 rounded-full bg-[#18191D] hover:bg-[#25272F] text-[#F3EDE2] font-bold text-base sm:text-lg shadow-lg border border-[#C59B4B]/60 flex items-center justify-center gap-2.5 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-75"
      >
        <ShoppingBag className="w-5 h-5 text-[#E6C67E]" />
        <span>
          {isSubmitting
            ? "অর্ডার প্রসেস হচ্ছে..."
            : `অর্ডার কনফার্ম করুন (${siteConfig.currencySymbol}${grandTotal})`}
        </span>
      </button>

      {/* Guarantees */}
      <div className="flex items-center justify-center gap-6 text-[11px] sm:text-xs text-stone-500 pt-1">
        <div className="flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-[#8C6B2A]" />
          <span>ক্যাশ অন ডেলিভারি</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8C6B2A]" />
          <span>৭ দিনের রিপ্লেসমেন্ট</span>
        </div>
      </div>
    </form>
  );
}
