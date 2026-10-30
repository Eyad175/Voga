"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ShoppingBag, Menu, ArrowLeft, Star, Flame } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

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
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Animated Glow Orbs */}
      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-voga-red/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-voga-orange/20 rounded-full blur-[120px]"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Header */}
      <header className="relative z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-voga-red to-voga-orange rounded-lg flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-display font-black tracking-wider">
            VOGA
          </h1>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:flex items-center gap-8"
        >
          <Link href="/" className="text-white hover:text-voga-red transition-colors font-medium">
            الرئيسية
          </Link>
          <Link href="/menu" className="text-white/70 hover:text-voga-red transition-colors font-medium">
            القائمة
          </Link>
          <Link href="/about" className="text-white/70 hover:text-voga-red transition-colors font-medium">
            من نحن
          </Link>
          <Link href="/contact" className="text-white/70 hover:text-voga-red transition-colors font-medium">
            تواصل معنا
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-4"
        >
          <button className="md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors">
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/cart" className="relative p-2 hover:bg-white/5 rounded-lg transition-colors">
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-voga-red rounded-full flex items-center justify-center text-xs font-bold">
              0
            </span>
          </Link>
        </motion.div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 pt-8 md:pt-16 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-voga-red/20 to-voga-orange/20 border border-voga-red/30 rounded-full"
              >
                <Flame className="w-4 h-4 text-voga-orange" />
                <span className="text-sm font-medium">برجر فاخر • طعم لا يقاوم</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-black leading-tight"
              >
                <span className="block">LUXURY</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-voga-red via-voga-orange to-voga-yellow text-glow">
                  BURGER
                </span>
                <span className="block">EXPERIENCE</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed"
              >
                جرب تجربة برجر استثنائية تجمع بين طعم الشارع الأصيل وأعلى معايير الجودة الفاخرة
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-voga-red to-voga-orange rounded-full font-bold text-lg overflow-hidden animate-pulse-glow"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    اطلب الآن
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-voga-orange to-voga-yellow opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.button>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-colors"
              >
                تعرف على القائمة
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center gap-8 pt-4"
            >
              <div className="text-center">
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-voga-yellow text-voga-yellow" />
                  ))}
                </div>
                <p className="text-sm text-white/60">+1000 عميل راضي</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-voga-orange">30-45</p>
                <p className="text-sm text-white/60">دقيقة توصيل</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-2xl font-bold text-voga-red">100%</p>
                <p className="text-sm text-white/60">لحم طازج</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Burger with Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative flex items-center justify-center"
          >
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-lg"
            >
              {/* Burger Image Container */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative burger-glow"
              >
                <div className="relative w-full aspect-square">
                  {/* Main Burger */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-[90%] h-[90%]">
                      {/* Burger Layers with Animation */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0"
                      >
                        <svg viewBox="0 0 400 400" className="w-full h-full">
                          {/* Top Bun */}
                          <ellipse cx="200" cy="120" rx="140" ry="60" fill="url(#bunGradient)" />
                          {/* Sesame Seeds */}
                          <circle cx="150" cy="110" r="3" fill="#D2691E" opacity="0.7" />
                          <circle cx="200" cy="105" r="3" fill="#D2691E" opacity="0.7" />
                          <circle cx="250" cy="110" r="3" fill="#D2691E" opacity="0.7" />
                          <circle cx="170" cy="115" r="3" fill="#D2691E" opacity="0.7" />
                          <circle cx="230" cy="115" r="3" fill="#D2691E" opacity="0.7" />
                          
                          {/* Lettuce */}
                          <ellipse cx="200" cy="150" rx="130" ry="15" fill="#228B22" opacity="0.9" />
                          
                          {/* Tomato */}
                          <ellipse cx="170" cy="170" rx="35" ry="8" fill="#DC143C" />
                          <ellipse cx="230" cy="170" rx="35" ry="8" fill="#DC143C" />
                          
                          {/* Cheese */}
                          <rect x="70" y="175" width="260" height="12" rx="6" fill="#FFD700" />
                          
                          {/* Patty */}
                          <ellipse cx="200" cy="210" rx="145" ry="45" fill="url(#pattyGradient)" />
                          
                          {/* Special Sauce */}
                          <ellipse cx="200" cy="235" rx="120" ry="10" fill="#8B4513" opacity="0.8" />
                          
                          {/* Bottom Bun */}
                          <ellipse cx="200" cy="280" rx="140" ry="40" fill="url(#bunGradient)" />
                          
                          <defs>
                            <linearGradient id="bunGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#D2691E" />
                              <stop offset="50%" stopColor="#8B4513" />
                              <stop offset="100%" stopColor="#654321" />
                            </linearGradient>
                            <linearGradient id="pattyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#8B4513" />
                              <stop offset="100%" stopColor="#654321" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -30, 0],
                  x: [0, 10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-voga-yellow to-voga-orange rounded-full flex items-center justify-center shadow-2xl"
              >
                <span className="text-2xl">🔥</span>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                  x: [0, -15, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-voga-red to-voga-orange rounded-full flex items-center justify-center shadow-2xl"
              >
                <span className="text-xl">🍔</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity:  1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl md:text-5xl font-display font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-voga-red to-voga-orange">
              الأكثر طلباً
            </span>
          </h3>
          <p className="text-white/60 text-lg">أكثر الأصناف مبيعاً لدى عملائنا الكرام</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative bg-gradient-to-br from-voga-card to-black border border-white/10 rounded-3xl overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-voga-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 space-y-4">
                <div className="relative h-48 flex items-center justify-center">
                  <div className="w-40 h-40 bg-gradient-to-br from-voga-red/20 to-voga-orange/20 rounded-full flex items-center justify-center">
                    <span className="text-6xl">🍔</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">VOGA Special</h4>
                  <p className="text-white/60 text-sm">لحم بقري فخر، جبن شيدر، صوص خاص، خضار طازجة</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-voga-orange">249 EGP</span>
                  <button className="px-6 py-2 bg-gradient-to-r from-voga-red to-voga-orange rounded-full font-medium hover:shadow-lg hover:shadow-voga-red/30 transition-shadow">
                    أضف للسلة
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
