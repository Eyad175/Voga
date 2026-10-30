"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

const items = [
  { id: 1, src: "/burgur.png", label: "BURGER" },
  { id: 2, src: "/brost.png", label: "BROST" },
  { id: 3, src: "/pitzaa.png", label: "PIZZA" },
];

export default function IntroPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number | null>(null);
  const [zooming, setZooming] = useState(false);

  const handleSelect = (id: number) => {
    if (selected !== null || zooming) return;
    setSelected(id);
    setZooming(true);
    setTimeout(() => {
      router.push("/");
    }, 1300);
  };

  return (
    <main className="min-h-[100dvh] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,30,30,0.16),transparent)]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="text-[clamp(3rem,14vw,14rem)] font-display font-black tracking-[-0.05em] leading-[0.75]">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/25">VOGA</span>
          </h1>
          <p className="mt-6 text-[10px] sm:text-xs uppercase tracking-[0.8em] text-white/30">
            select your craving
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {items.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: selected === null || selected === item.id ? 1 : 0,
                y: 0,
                scale: selected === item.id && zooming ? 2.2 : 1,
                filter: selected === null ? "blur(0px)" : selected === item.id ? "blur(0px)" : "blur(16px)",
              }}
              transition={{
                duration: selected === item.id ? 1.3 : 1,
                delay: selected === null ? index * 0.14 : 0,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              onClick={() => handleSelect(item.id)}
              className="group relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-[28px] md:rounded-[36px] border border-white/10"
            >
              <Image
                src={item.src}
                alt={item.label}
                fill
                className="object-cover scale-110 group-hover:scale-[1.18] transition-transform duration-[1600ms] ease-out"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute inset-0">
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.5em] text-white/40 mb-2">VOGA</p>
                    <p className="text-xl md:text-3xl font-display font-black tracking-[0.25em]">{item.label}</p>
                  </div>
                  <div className="w-11 h-11 rounded-full border border-white/25 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-700">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/20 transition-all duration-700" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {zooming && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-black z-50"
          />
        )}
      </AnimatePresence>
    </main>
  );
}
