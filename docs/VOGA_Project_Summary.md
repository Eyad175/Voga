# 🍔 VOGA — Luxury Burger Platform

> منصة توصيل برجر فاخر أونلاين — ملخص المشروع الكامل

---

## 📋 ملخص القرارات

| الجانب | القرار |
|---|---|
| **النوع** | توصيل أونلاين فقط |
| **النطاق** | مطعم واحد |
| **الدفع** | أونلاين فقط (كارت، Vodafone Cash، Fawry) |
| **حسابات العملاء** | زائر + تسجيل (loyalty، عناوين محفوظة، تتبع طلبات) |
| **تخصيص القائمة** | تخصيص كامل (خبز، درجة نضج، صوص، إضافات) |
| **تتبع الطلب** | صفحة حالة + إشعارات (SMS/Push) |
| **لوحة الإدارة** | إدارة قائمة + طلبات + تقارير + صلاحيات (owner vs staff) |
| **التقنية** | Next.js 14 + Supabase + Paymob + Vercel |
| **الهوية البصرية** | Bold وشبابي — ألوان قوية، street food energy، جودة premium |
| **التوصيل** | فريق خاص، منطقة محددة (توسع لاحقاً) |

---

## 🖥️ Customer Side

### الصفحات الأساسية

#### Home
- Hero banner مع صور جذابة للمنتجات
- Featured items / أكثر المنتجات طلباً
- CTA واضح للطلب

#### Menu
- تصفية حسب الكاتيجوري
- تخصيص كامل لكل عنصر:
  - نوع الخبز
  - درجة نضج اللحم
  - نوع الصوص
  - الإضافات

#### Cart
- مراجعة العناصر والخيارات المخصصة
- تعديل الكميات
- ملخص السعر

#### Checkout
- إدخال عنوان التوصيل
- دفع أونلاين عبر Paymob (كارت / Vodafone Cash / Fawry)

#### Order Tracking
- صفحة حالة الطلب (جاري التحضير ← خرج للتوصيل ← وصل)
- إشعارات SMS وPush عند تغيير الحالة

#### Profile *(للمسجلين فقط)*
- عناوين محفوظة
- سجل الطلبات السابقة
- نقاط الـLoyalty

#### Auth
- تسجيل حساب جديد
- تسجيل دخول
- Checkout كزائر بدون حساب

---

## ⚙️ Admin Side

### Dashboard
- إجمالي المبيعات اليومية / الأسبوعية / الشهرية
- أكثر الأصناف طلباً
- مؤشرات الأداء الرئيسية (KPIs)

### Orders Management
- استقبال الطلبات الجديدة في الوقت الفعلي
- تغيير حالة الطلب
- إلغاء الطلبات مع السبب

### Menu Management
- إضافة / تعديل / حذف الأصناف
- إدارة خيارات التخصيص (خبز، صوص، إضافات)
- تفعيل / تعطيل صنف مؤقتاً

### Staff Management
- إنشاء حسابات الموظفين
- تعيين الصلاحيات (Owner / Staff)

### Reports
- تقارير الإيرادات
- الأصناف الأكثر مبيعاً
- ساعات الذروة

---

## 🗄️ Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend** | Next.js 14 (App Router) | SSR، سرعة، SEO |
| **Database** | Supabase (PostgreSQL) | داتا بيز + Auth + Realtime |
| **Backend** | Next.js API Routes | API endpoints |
| **Payment** | Paymob | كارت، Vodafone Cash، Fawry |
| **Push Notifications** | Firebase FCM | إشعارات حالة الطلب |
| **SMS** | Vonage / Twilio | SMS fallback |
| **Hosting** | Vercel | Zero-config deployment |
| **Storage** | Supabase Storage | صور القائمة والأصول |
| **Styling** | Tailwind CSS | UI سريع ومتسق |

---

## 🎨 Brand Identity

- **الاسم:** VOGA
- **الـVibe:** Bold وشبابي — street food energy مع جودة premium
- **الألوان:** قوية وجريئة (تحدد لاحقاً في design system)
- **الهدف:** العميل يحس بالـenergy والـstyle من أول لحظة

---

## 🚀 الخطوات التالية المقترحة

1. **Database Schema** — تصميم هيكل الداتا بيز الكامل
2. **UI Design** — تصميم الشاشات الأساسية بالهوية البصرية لـVOGA
3. **Frontend** — بناء الـcomponents الأساسية
4. **Backend** — API routes والـbusiness logic
5. **Payment Integration** — ربط Paymob
6. **Testing & Launch** — اختبار وإطلاق

---

*VOGA Project Summary — Generated October 2026*
