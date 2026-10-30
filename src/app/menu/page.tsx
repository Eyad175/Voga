"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { Toaster, toast } from "sonner";

const menuItems = [
  { id: "voga-classic", name: "SIGNATURE BURGER", price: 249, desc: "لحم بقري فخر، جبن شيدر، خس طازج، طماطم، بصل كرمل، صوص VOGA الخاص", img: "/burgur.png" },
  { id: "crispy-brost", name: "CRISPY BROST", price: 229, desc: "قطع بروست مقرمشة، خلطة سرية، صوص الثوم المدخن", img: "/pitzaa.png" },
  { id: "wood-pizza", name: "WOOD FIRED PIZZA", price: 279, desc: "عجينة رقيقة مخمرة، صوص الطماطم الإيطالي، جبن موتزاريلا فاخر", img: "/pitzaa.png" },
  { id: "double-stack", name: "DOUBLE STACK", price: 299, desc: "قطعتين لحم فخر، مزدوج جبن شيدر، طبقات غنية وصوص سري", img: "/burgur.png" },
];

export default function MenuPage() {
  const addItem = useCartStore((state) => state.addItem);
  const count = useCartStore((state) => state.getCount());

  const handleAdd = (item: typeof menuItems[0]) => {
    addItem({ id: item.id, name: item.name, price: item.price, image: item.img });
    toast.success("تم إضافة المنتج للسلة");
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
        <Link href="/cart" className="relative px-6 py-2.5 border border-white/14 rounded-full text-[10px] uppercase tracking-[0.36em] hover:bg-white/5 hover:border-white/30 transition-all duration-600">
          السلة
          {count > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-voga-red rounded-full flex items-center justify-center text-[9px] font-bold">
              {count}
            </span>
          )}
        </Link>
      </header>

      <section className="relative z-10 container mx-auto px-4 sm:px-6 md:px-10 lg:px-14 py-10 md:py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="mb-12 md:mb-16">
          <Link href="/" className="inline-flex items-center gap-2 text-white/38 hover:text-white transition-colors duration-600 mb-8">
            <ArrowRight className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.38em]">العودة للرئيسية</span>
          </Link>
          <h1 className="text-[clamp(2.8rem,9vw,8rem)] font-extrabold leading-[0.88] tracking-[-0.03em] mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/28">OUR</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-voga-red to-voga-orange">MENU</span>
          </h1>
          <p className="text-white/48 max-w-lg">قائمة كاملة بأرقى الأطباق</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {menuItems.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: index * 0.09 }} whileHover={{ y: -10 }} className="group relative">
              <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.012] to-transparent overflow-hidden backdrop-blur-sm transition-all duration-800 hover:border-voga-red/40">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,30,30,0.12),transparent_65%)] opacity-0 group-hover:opacity-100 transition-opacity duration-800" />
                <div className="relative h-64 md:h-72 flex items-center justify-center">
                  <motion.div whileHover={{ scale: 1.06, rotate: 1.5 }} transition={{ duration: 0.8 }} className="relative w-[78%] h-[78%]">
                    <Image src={item.img} alt={item.name} fill className="object-contain drop-shadow-[0_50px_100px_rgba(255,40,0,0.22)]" />
                  </motion.div>
                </div>
                <div className="relative p-6 space-y-3">
                  <div>
                    <h3 className="text-base font-extrabold tracking-[0.22em] mb-2">{item.name}</h3>
                    <p className="text-sm text-white/48 leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-semibold">{item.price} <span className="text-sm text-white/38">EGP</span></span>
                    <motion.button onClick={() => handleAdd(item)} whileHover={{ scale: 1.09 }} whileTap={{ scale: 0.94 }} className="w-11 h-11 rounded-full bg-gradient-to-br from-voga-red to-voga-orange flex items-center justify-center shadow-[0_0_50px_rgba(255,30,30,0.32)] hover:shadow-[0_0_70px_rgba(255,79,0,0.48)] transition-shadow duration-700">
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
