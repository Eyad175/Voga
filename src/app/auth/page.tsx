"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Lock, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <main className="min-h-[100dvh] relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_0%,rgba(255,30,30,0.14),transparent)]" />
        <Image src="/burgur.png" alt="" fill className="object-cover opacity-[0.07] scale-110" />
        <div className="absolute inset-0 bg-black/85" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="text-center mb-9">
          <Link href="/" className="inline-flex items-center gap-3 mb-7">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-voga-red to-voga-orange flex items-center justify-center shadow-[0_0_60px_rgba(255,30,30,0.36)]">
              <span className="font-display font-black text-lg">V</span>
            </div>
            <span className="text-lg font-display font-black tracking-[0.55em] uppercase">VOGA</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-black tracking-tight mb-2">
            {mode === "login" ? "مرحباً بعودتك" : "إنشاء حساب جديد"}
          </h1>
          <p className="text-white/48">
            {mode === "login" ? "أدخل بياناتك للوصول إلى حسابك" : "انضم إلى تجربة VOGA الفاخرة"}
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.12 }} className="relative rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.015] to-transparent backdrop-blur-xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-voga-red/40 to-transparent" />
          <div className="p-7 md:p-8 space-y-5">
            <button className="w-full flex items-center justify-center gap-3 py-3.5 rounded-full border border-white/12 hover:bg-white/5 hover:border-white/28 transition-all duration-600">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
                <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
                <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
                <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
              </svg>
              <span className="text-sm">متابعة باستخدام Google</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/8" />
              <span className="text-[10px] text-white/28 uppercase tracking-[0.4em]">أو</span>
              <div className="flex-1 h-px bg-white/8" />
            </div>

            <div className="space-y-4">
              {mode === "register" && (
                <div className="relative">
                  <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/28" />
                  <input type="text" placeholder="الاسم الكامل" className="w-full bg-white/[0.01] border border-white/10 rounded-full px-11 py-3.5 text-sm focus:outline-none focus:border-voga-red/55 transition-colors duration-600" />
                </div>
              )}
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/28" />
                <input type="email" placeholder="البريد الإلكتروني" className="w-full bg-white/[0.01] border border-white/10 rounded-full px-11 py-3.5 text-sm focus:outline-none focus:border-voga-red/55 transition-colors duration-600" />
              </div>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/28" />
                <input type="password" placeholder="كلمة المرور" className="w-full bg-white/[0.01] border border-white/10 rounded-full px-11 py-3.5 text-sm focus:outline-none focus:border-voga-red/55 transition-colors duration-600" />
              </div>
            </div>

            <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-voga-red to-voga-orange text-sm uppercase tracking-[0.32em] hover:shadow-[0_0_70px_rgba(255,30,30,0.38)] transition-shadow duration-800">
              {mode === "login" ? "تسجيل الدخول" : "إنشاء الحساب"}
            </button>

            <p className="text-center text-sm text-white/48">
              {mode === "login" ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}
              <button onClick={() => setMode(mode === "login" ? "register" : "login")} className="text-white hover:text-voga-red transition-colors mr-2">
                {mode === "login" ? "إنشاء حساب" : "تسجيل الدخول"}
              </button>
            </p>
          </div>
        </motion.div>

        <div className="text-center mt-6">
          <Link href="/" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.38em] text-white/38 hover:text-white transition-colors duration-600">
            <ArrowRight className="w-4 h-4" />
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
