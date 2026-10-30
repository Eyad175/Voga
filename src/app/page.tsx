"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingBag, Menu, ArrowLeft, Star, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const reviews = [
  { name: "أحمد م.", rating: 5, text: "أجمل برجر جربته، جودة عالية جداً وخدمة راقية" },
  { name: "سارة ك.", rating: 5, text: "التوصيل سريع والطعم فوق الخيال فعلاً يستحق التجربة" },
  { name: "محمود ع.", rating: 5, text: "كل حاجة فخمة من أول لقمة لحد النهاية" },
];

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 38, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [-500, 500], [12, -12]);
  const rotateY = useTransform(springX, [-500, 500], [-12, 12]);
  const tx = useTransform(springX, [-500, 500], [-10, 10]);
  const ty = useTransform(springY, [-500, 500], [-6, 6]);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set(e.clientX - cx);
      mouseY.set(e.clientY - cy);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [mouseX, mouseY]);

  return (
    <main className="min-h-[100dvh] relative overflow-x-hidden bg-black">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_-10%,rgba(255,30,30,0.16),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(255,79,0,0.09),transparent_56%)]" />
      </div>

      <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-14 py-5 md:py-6">
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-voga-red to-voga-orange flex items-center justify-center shadow-[0_0_70px_rgba(255,30,30,0.38)]">
            <span className="font-extrabold text-lg">V</span>
          </div>
          <h1 className="text-lg md:text-xl lg:text-2xl font-extrabold tracking-[0.6em] uppercase">VOGA</h1>
        </motion.div>

        <motion.nav initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }} className="hidden lg:flex items-center gap-10">
          <Link href="/" className="text-xs uppercase tracking-[0.32em]">الرئيسية</Link>
          <Link href="/menu" className="text-xs uppercase tracking-[0.32em] text-white/55 hover:text-white transition-colors duration-500">القائمة</Link>
          <Link href="#reviews" className="text-xs uppercase tracking-[0.32em] text-white/55 hover:text-white transition-colors duration-500">التقييمات</Link>
          <Link href="/auth" className="text-xs uppercase tracking-[0.32em] text-white/55 hover:text-white transition-colors duration-500">تسجيل الدخول</Link>
        </motion.nav>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="flex items-center gap-2">
          <Link href="/auth" className="hidden md:flex items-center gap-2 px-5 py-2.5 border border-white/12 rounded-full text-xs uppercase tracking-[0.28em] hover:bg-white/5 hover:border-white/30 transition-all duration-500">
            <User className="w-4 h-4" />
            دخول
          </Link>
          <Link href="/cart" className="relative p-2.5 hover:bg-white/5 rounded-xl transition-colors duration-500">
            <ShoppingBag className="w-5 h-5" />
          </Link>
          <button className="lg:hidden p-2.5 hover:bg-white/5 rounded-xl">
            <Menu className="w-5 h-5" />
          </button>
        </motion.div>
      </header>

      <section className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pt-6 md:pt-10 lg:pt-16 pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-6 space-y-8">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }} className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/12 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-voga-red shadow-[0_0_18px_rgba(255,30,30,0.9)]" />
                <span className="text-[10px] uppercase tracking-[0.42em] text-white/60">Luxury Food Experience</span>
              </div>
              <h2 className="text-[clamp(3.2rem,10vw,10rem)] font-extrabold leading-[0.82] tracking-[-0.04em]">
                <span className="block">THE</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/28">ART OF</span>
                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-voga-red via-voga-orange to-voga-yellow">FLAVOR</span>
              </h2>
              <p className="text-base md:text-lg text-white/55 max-w-lg leading-relaxed">
                برجر، بروست، بيتزا.. صُنعت بفخامة، تُقدم بإتقان
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3 }} className="flex flex-wrap gap-4">
              <Link href="/menu">
                <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} className="group relative px-9 md:px-11 py-4 rounded-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-voga-red to-voga-orange" />
                  <div className="absolute inset-0 bg-gradient-to-r from-voga-orange to-voga-yellow translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-[900ms] ease-out" />
                  <span className="relative z-10 flex items-center gap-3 text-xs uppercase tracking-[0.38em]">
                    القائمة
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-700" />
                  </span>
                </motion.button>
              </Link>
              <Link href="/intro">
                <motion.button whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} className="px-9 md:px-11 py-4 rounded-full border border-white/14 text-xs uppercase tracking-[0.38em] hover:bg-white/5 hover:border-white/32 transition-all duration-700">
                  اختيار الطعام
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <div className="lg:col-span-6 relative">
            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, delay: 0.25 }} className="relative flex items-center justify-center">
              <motion.div style={{ rotateX, rotateY, x: tx, y: ty, transformStyle: "preserve-3d" }} className="relative w-full max-w-[660px]">
                <motion.div animate={{ y: [0, -16, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}>
                  <div className="absolute -inset-24 bg-[radial-gradient(circle,rgba(255,60,0,0.22),transparent_72%)] blur-[140px]" />
                  <Image src="/burgur.png" alt="VOGA" width={1400} height={1400} priority className="relative w-full h-auto drop-shadow-[0_100px_200px_rgba(255,40,0,0.24)]" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="reviews" className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 pb-28">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="text-center mb-10 md:mb-14">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/35 mb-4">Testimonials</p>
          <h3 className="text-[clamp(2rem,6vw,4.8rem)] font-extrabold tracking-[-0.03em]">آراء العملاء</h3>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-4 md:gap-5">
          {reviews.map((rev, idx) => (
            <motion.div key={rev.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: idx * 0.12 }} className="relative p-7 md:p-8 rounded-[26px] border border-white/10 bg-gradient-to-b from-white/[0.01] to-transparent">
              <div className="flex items-center gap-1 mb-5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-voga-yellow text-voga-yellow" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-6">"{rev.text}"</p>
              <p className="text-xs uppercase tracking-[0.34em] text-white/40">{rev.name}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
