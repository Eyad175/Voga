"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingBag, Menu, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-400, 400], [12, -12]);
  const rotateY = useTransform(springX, [-400, 400], [-12, 12]);
  const translateX = useTransform(springX, [-400, 400], [-15, 15]);
  const translateY = useTransform(springY, [-400, 400], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-[100dvh] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,30,30,0.15),rgba(0,0,0,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,79,0,0.08),transparent_50%)]" />
      </div>

      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-16 py-5 md:py-7">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-3"
        >
          <div className="relative">
            <div className="w-11 h-11 bg-gradient-to-br from-voga-red to-voga-orange rounded-xl flex items-center justify-center shadow-[0_0_60px_rgba(255,30,30,0.4)]">
              <span className="text-white font-display font-black text-lg tracking-tight">V</span>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-display font-black tracking-[0.3em] uppercase">
            VOGA
          </h1>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="hidden lg:flex items-center gap-10"
        >
          <Link href="/" className="text-sm uppercase tracking-[0.2em] text-white hover:text-voga-red transition-colors duration-300">
            الرئيسية
          </Link>
          <Link href="/menu" className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300">
            القائمة
          </Link>
          <Link href="/menu" className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300">
            عنا
          </Link>
          <Link href="/menu" className="text-sm uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300">
            تواصل
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex items-center gap-3"
        >
          <button className="lg:hidden p-2.5 hover:bg-white/5 rounded-xl transition-colors duration-300">
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/cart" className="relative group p-2.5 hover:bg-white/5 rounded-xl transition-colors duration-300">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-voga-red rounded-full flex items-center justify-center text-[10px] font-bold">
              0
            </span>
          </Link>
        </motion.div>
      </header>

      <section className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-6 md:pt-10 lg:pt-14 pb-16">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-voga-red shadow-[0_0_20px_rgba(255,30,30,0.8)]" />
                <span className="text-xs uppercase tracking-[0.25em] text-white/70">Artisan Crafted • Premium Cuts</span>
              </div>

              <h2 className="text-[clamp(3rem,9vw,9rem)] font-display font-black leading-[0.85] tracking-[-0.02em]">
                <span className="block">THE</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-white/40">
                  ULTIMATE
                </span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-voga-red via-voga-orange to-voga-yellow">
                  BURGER
                </span>
              </h2>

              <p className="text-base md:text-lg text-white/60 max-w-md leading-relaxed">
                برجر فاخر مصنوع من أجود قطع اللحم، مشوي بعناية، ومُقدم بتفاصيل لا تُضاهى
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-10 py-4 overflow-hidden rounded-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-voga-red to-voga-orange" />
                  <div className="absolute inset-0 bg-gradient-to-r from-voga-orange to-voga-yellow translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />
                  <span className="relative z-10 flex items-center gap-3 text-sm uppercase tracking-[0.3em] font-medium">
                    اطلب الآن
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-500" />
                  </span>
                </motion.button>
              </Link>

              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 border border-white/15 rounded-full text-sm uppercase tracking-[0.3em] hover:bg-white/5 hover:border-white/30 transition-all duration-500"
                >
                  عرض القائمة
                </motion.button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex items-center gap-10 pt-4"
            >
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">100%</p>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mt-2">لحم طازج</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">30-45</p>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mt-2">دقيقة توصيل</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-3xl md:text-4xl font-display font-bold">+1000</p>
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mt-2">عميل راضي</p>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative flex items-center justify-center"
            >
              <motion.div
                style={{
                  rotateX,
                  rotateY,
                  x: translateX,
                  y: translateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative w-full max-w-[620px]"
              >
                <motion.div
                  animate={{
                    y: [0, -18, 0],
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <div className="absolute -inset-20 bg-[radial-gradient(circle,rgba(255,79,0,0.25),transparent_70%)] blur-3xl" />
                  <Image
                    src="/burgur.png"
                    alt="VOGA Luxury Burger"
                    width={1200}
                    height={1200}
                    priority
                    className="relative w-full h-auto drop-shadow-[0_80px_160px_rgba(255,40,0,0.25)]"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
