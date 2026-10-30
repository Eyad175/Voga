"use client";

import { motion } from "framer-motion";
import { ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { Toaster, toast } from "sonner";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("السلة فارغة");
      return;
    }
    toast.success("سيتم تحويلك لصفحة الدفع قريباً");
  };

  return (
    <main className="min-h-[100dvh] relative overflow-x-hidden bg-black">
      <Toaster theme="dark" position="top-center" richColors />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,30,30,0.12),transparent)]" />
      </div>

      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-5 md:py-6 border-b border-white/6">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-voga-red to-voga-orange flex items-center justify-center">
            <span className="font-extrabold">V</span>
          </div>
          <span className="text-lg font-extrabold tracking-[0.5em] uppercase">VOGA</span>
        </Link>
        <Link href="/menu" className="px-6 py-2.5 border border-white/14 rounded-full text-[10px] uppercase tracking-[0.36em] hover:bg-white/5 hover:border-white/30 transition-all duration-600">
          العودة للقائمة
        </Link>
      </header>

      <section className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-10 md:mb-14">
          <Link href="/menu" className="inline-flex items-center gap-2 text-white/38 hover:text-white transition-colors duration-600 mb-8">
            <ArrowRight className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.38em]">القائمة</span>
          </Link>
          <h1 className="text-[clamp(2.8rem,9vw,7rem)] font-extrabold leading-[0.88] tracking-[-0.03em]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/28">YOUR</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-voga-red to-voga-orange">CART</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
          <div className="lg:col-span-8 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-20 border border-white/10 rounded-[28px]">
                <p className="text-white/48 mb-6">السلة فارغة</p>
                <Link href="/menu" className="inline-flex px-8 py-3 rounded-full border border-white/14 text-xs uppercase tracking-[0.32em] hover:bg-white/5 transition-all duration-600">
                  تصفح القائمة
                </Link>
              </div>
            ) : (
              items.map((item, index) => (
                <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: index * 0.08 }} className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-[26px] border border-white/10 bg-gradient-to-r from-white/[0.01] to-transparent">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 text-center sm:text-right">
                    <h3 className="text-lg font-extrabold tracking-[0.18em] mb-2">{item.name}</h3>
                    <p className="text-white/48">{item.price} EGP</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 rounded-full border border-white/14 flex items-center justify-center hover:bg-white/5 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 rounded-full border border-white/14 flex items-center justify-center hover:bg-white/5 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-2.5 hover:bg-white/5 rounded-xl text-white/40 hover:text-white transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </motion.div>
              ))
            )}
          </div>

          <div className="lg:col-span-4">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="p-7 md:p-8 rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.015] to-transparent sticky top-6">
              <h3 className="text-xl font-extrabold tracking-[0.2em] mb-6">ملخص الطلب</h3>
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-white/60">
                  <span>المجموع</span>
                  <span>{total} EGP</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>التوصيل</span>
                  <span>مجاني</span>
                </div>
                <div className="h-px bg-white/8" />
                <div className="flex items-center justify-between text-lg">
                  <span>الإجمالي</span>
                  <span className="font-extrabold">{total} EGP</span>
                </div>
              </div>
              <button onClick={handleCheckout} className="w-full py-3.5 rounded-full bg-gradient-to-r from-voga-red to-voga-orange text-xs uppercase tracking-[0.32em] hover:shadow-[0_0_70px_rgba(255,30,30,0.38)] transition-shadow duration-800 mb-3">
                إتمام الطلب
              </button>
              {items.length > 0 && (
                <button onClick={() => { clearCart(); toast.success("تم إفراغ السلة"); }} className="w-full py-3 rounded-full border border-white/12 text-xs uppercase tracking-[0.28em] hover:bg-white/5 transition-all duration-600">
                  إفراغ السلة
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
