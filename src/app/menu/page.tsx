"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { id: 1, name: "VOGA CLASSIC", price: 199, desc: "لحم بقري فخر، جبن أمريكي، خس طازج، طماطم، بصل، صوص VOGA الخاص", img: "/burgur.png" },
  { id: 2, name: "SMOKY BBQ", price: 229, desc: "لحم بقري مشوي، جبن شيدر مدخن، بصل مقلي، بيكون، صوص باربيكيو", img: "/burgur.png" },
  { id: 3, name: "DOUBLE STACK", price: 299, desc: "قطعتين لحم فخر، جبن مزدوج، خس، طماطم، مخلل، صوص سري", img: "/burgur.png" },
  { id: 4, name: "TRUFFLE ROYALE", price: 349, desc: "لحم فخر، جبن جرويير، فطر ترافل، صوص ترافل، بصل كرمل", img: "/burgur.png" },
];

export default function MenuPage() {
  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(255,30,30,0.12),transparent)]" />
      </div>

      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-5 md:py-7 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-voga-red to-voga-orange rounded-xl flex items-center justify-center">
            <span className="text-white font-display font-black">V</span>
          </div>
          <h1 className="text-xl font-display font-black tracking-[0.3em] uppercase">VOGA</h1>
        </Link>
        <Link href="/cart" className="px-6 py-2.5 border border-white/15 rounded-full text-xs uppercase tracking-[0.25em] hover:bg-white/5 hover:border-white/30 transition-all duration-500">
          السلة
        </Link>
      </header>

      <section className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 py-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 md:mb-16"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 mb-8">
            <ArrowRight className="w-4 h-4" />
            <span className="text-xs uppercase tracking-[0.25em]">العودة للرئيسية</span>
          </Link>
          <h1 className="text-[clamp(2.5rem,8vw,7rem)] font-display font-black leading-[0.9] tracking-[-0.02em] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">OUR</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-voga-red to-voga-orange">MENU</span>
          </h1>
          <p className="text-white/50 max-w-md">كل برجر يُصنع يدوياً من أجود المكونات بأناقة ودقة</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-b from-white/[0.02] to-transparent border border-white/8 rounded-[28px] overflow-hidden backdrop-blur-sm transition-all duration-700 hover:border-voga-red/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,30,30,0.1),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative p-6 pb-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="relative w-full aspect-square max-w-[220px]"
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={600}
                      height={600}
                      className="w-full h-full object-contain drop-shadow-[0_40px_80px_rgba(255,40,0,0.2)]"
                    />
                  </motion.div>
                </div>

                <div className="relative p-6 space-y-4">
                  <div>
                    <h3 className="text-lg font-display font-bold tracking-wide mb-2">{item.name}</h3>
                    <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xl font-display font-semibold">{item.price} <span className="text-sm text-white/40">EGP</span></span>
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-11 h-11 bg-gradient-to-br from-voga-red to-voga-orange rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,30,30,0.3)] hover:shadow-[0_0_60px_rgba(255,79,0,0.5)] transition-shadow duration-500"
                    >
                      <Plus className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
