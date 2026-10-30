"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CartPage() {
  return (
    <main className="min-h-[100dvh] relative overflow-hidden flex items-center justify-center bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,30,30,0.12),transparent)]" />
      </div>
      <div className="relative z-10 text-center px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-extrabold tracking-[-0.04em] mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30">CART</span>
          </h1>
          <p className="text-white/48 mb-10">السلة فارغة حالياً</p>
          <Link href="/menu" className="inline-flex items-center gap-3 px-8 py-3 rounded-full border border-white/14 text-xs uppercase tracking-[0.32em] hover:bg-white/5 transition-all duration-600">
            تصفح القائمة
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
