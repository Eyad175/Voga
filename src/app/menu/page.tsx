"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

const menuItems = [
  { id: 1, name: "VOGA Classic", price: 199, desc: "لحم بقري فخر، جبن أمريكي، خس، طماطم، بصل، صوص خاص", cat: "burgers", img: "🍔" },
  { id: 2, name: "VOGA Smoky BBQ", price: 229, desc: "لحم مدخن، جبن شيدر، بصل مقلي، بيكون، صوص BBQ", cat: "burgers", img: "🍔" },
  { id: 3, name: "VOGA Double Stack", price: 299, desc: "قطعتين لحم، مزدوج جبن، كل الإضافات، صوص فاخر", cat: "burgers", img: "🍔" },
  { id: 4, name: "Truffle Royale", price: 349, desc: "لحم واغيو، جبن جرويير، مشروم ترافل، صوص ترافل", cat: "burgers", img: "🍔" },
];

export default function MenuPage() {
  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <header className="relative z-50 flex items-center justify-between px-4 md:px-8 lg:px-12 py-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-voga-red to-voga-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">V</span>
          </div>
          <h1 className="text-2xl font-display font-black">VOGA</h1>
        </Link>
        <Link href="/cart" className="px-6 py-2 bg-gradient-to-r from-voga-red to-voga-orange rounded-full font-medium">
          السلة
        </Link>
      </header>

      <section className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-white/60 hover:text-voga-red transition-colors mb-6">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
          <h1 className="text-4xl md:text-6xl font-display font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-voga-red to-voga-orange">
              القائمة
            </span>
          </h1>
          <p className="text-white/60 text-lg">اختر برجر فخم وخصصه حسب ذوقك</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group relative bg-gradient-to-br from-voga-card to-black border border-white/10 rounded-3xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-voga-red/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-6 space-y-4">
                <div className="relative h-48 flex items-center justify-center">
                  <motion.div
                    whileHover={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.5 }}
                    className="text-8xl"
                  >
                    {item.img}
                  </motion.div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-2xl font-bold text-voga-orange">{item.price} EGP</span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gradient-to-r from-voga-red to-voga-orange rounded-full flex items-center justify-center shadow-lg shadow-voga-red/30"
                  >
                    <Plus className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
