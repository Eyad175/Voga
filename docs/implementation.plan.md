# 🗺️ VOGA — Implementation Plan

> خطة التنفيذ التفصيلية لمنصة VOGA — Luxury Burger Platform
> مبنية على: `VOGA_PRD.docx` (v1.0) + `VOGA_Project_Summary.md`
> المدة الإجمالية: **11 أسبوع** | الإطلاق المستهدف: **أسبوع 11**

---

## 🎯 مبادئ التنفيذ

1. **Mobile-first** — أغلب طلبات التوصيل تأتي من الموبايل؛ كل شاشة تُبنأ للموبايل أولاً.
2. **Vertical Slices** — كل feature تُسلّم end-to-end (DB → API → UI) قبل الانتقال للتالية.
3. **Realtime من اليوم الأول** — Supabase Realtime جزء أساسي، ليس إضافة لاحقة.
4. **PR من كل مهمة** — كل task في الجدول أدناه = PR واحد قابل للمراجعة.
5. **Type Safety** — TypeScript strict mode + types مولّدة من Supabase schema.

---

## 📦 Phase 1 — Foundation (الأسبوع 1–2)

### 1.1 Project Scaffolding
- [ ] إنشاء Next.js 14 (App Router) + TypeScript + Tailwind CSS
- [ ] إعداد ESLint + Prettier + Husky (pre-commit checks)
- [ ] repo structure:
```
src/
  app/            # routes (App Router)
    (customer)/   # home, menu, cart, checkout, tracking
    (auth)/       # login, register
    admin/        # dashboard, orders, menu, staff, reports
    api/          # API routes
  components/     # ui/ + features/
  lib/            # supabase client, paymob, utils, validators
  types/          # DB types (generated) + app types
  hooks/          # useCart, useRealtimeOrder, ...
supabase/
  migrations/     # SQL migrations
  seed.sql
```
- [ ] Vercel project + preview deployments لكل PR
- [ ] Environment variables: `SUPABASE_URL/KEY`, `PAYMOB_*`, `FCM_*`, `SMS_*`

### 1.2 Database Schema (Supabase/PostgreSQL)
- [ ] إنشاء مشروع Supabase + migrations:
```
users               id, name, email, phone, role (customer|staff|owner), loyalty_points, created_at
addresses           id, user_id, label, street, city, coordinates (latlng), is_default
menu_categories     id, name, slug, sort_order
menu_items          id, category_id, name, description, base_price, image_url, is_available, is_featured
customization_groups   id, item_id, name (bread|doneness|sauce|addons), min_select, max_select, sort_order
customization_options  id, group_id, name, extra_price, is_available
orders              id, order_number, user_id (nullable → guest), address_snapshot (jsonb),
                    status (received|preparing|out_for_delivery|delivered|cancelled),
                    subtotal, delivery_fee, total, payment_method, payment_status, cancel_reason, created_at
order_items         id, order_id, menu_item_id, item_name_snapshot, quantity, unit_price
order_item_options  id, order_item_id, option_id, option_name_snapshot, extra_price
notifications       id, order_id, channel (push|sms), status, payload, sent_at
staff_profiles      user_id, role (owner|staff), is_active
```
- [ ] **Snapshots عبر jsonb** — الأسعار والأسماء تُحفظ وقت الطلب (حماية من تعديل القائمة لاحقاً)
- [ ] Row Level Security (RLS):
  - `orders`: العميل يرى طلباته فقط | staff/owner يرون الكل
  - `menu_items`: تعديل للـowner فقط | قراءة عامة
  - `staff_profiles`: قراءة/تعديل للـowner فقط
- [ ] Indexes: `orders(status, created_at)`, `orders(user_id)`, `menu_items(category_id)`
- [ ] Seed script: كاتيجوريات (Burgers, Sides, Drinks, Combos) + أصناف تجريبية
- [ ] توليد TypeScript types من الـschema: `supabase gen types`

### 1.3 Auth
- [ ] Supabase Auth: email/phone + password (bcrypt — مدمج)
- [ ] RLS linking: `auth.users` ↔ `public.users` (trigger على signup)
- [ ] صفحات: `/login`, `/register` (+ validation بـzod)
- [ ] Middleware لحماية `/admin` + role check (owner/staff)

**✅ Milestone 1:** DB كامل + Auth يعمل + CI/CD على Vercel

---

## 🛍️ Phase 2 — Core Ordering (الأسبوع 3–5)

### 2.1 UI Design System (الأسبوع 3)
- [ ] Brand tokens: ألوان bold/شبابية + Tailwind config (colors, typography, radii)
- [ ] Shared components: Button, Input, Card, Badge, Drawer, Modal, Toast
- [ ] Layout: Header (categories smart bar) + Bottom Nav للموبايل

### 2.2 Menu (الأسبوع 3–4)
- [ ] `/` Home: Hero banner + Featured items + CTA
- [ ] `/menu`SSR (SEO) + تصفية حسب category + مؤشر "out of stock"
- [ ] Item Detail + **Customization Builder**:
  - خبز / درجة نضج / صوص / إضافات (radio vs checkbox حسب min/max_select)
  - **حساب السعر لحظي**: `base_price + Σ(extra_price)` مع تعطيل الخيارات غير المتاحة
  - الـUI الحساس للتخصيص يُبنى كـclient component بعد SSR للبيانات

### 2.3 Cart (الأسبوع 4)
- [ ] Cart state: Zustand + persist في localStorage
  - guests: localStorage فقط | المسجلون: sync بسيط لحسابهم (اختياري)
  - كل عنصر = `menu_item_id + options[] + quantity` مع key للتمييز بين combos مختلفة التخصيص
- [ ] صفحة `/(customer)/cart`: تعديل كمية/حذف/ملخص + ربط بـSupabase لحساب أسعار الإضافات اللحظية

### 2.4 Checkout (الأسبوع 5)
- [ ] `/(customer)/checkout`:
  - guests: إدخال عنوان يدوي | المسجلون: عناوين محفوظة + إضافة جديد
- [ ] API `/api/orders` (POST):
  1. إعادة حساب السعر **على السيرفر** (لا ثقة بأسعار الكلاينت)
  2. إنشاء order + order_items + options في transaction
  3. خصم المخزون/التوفر إن وجد
- [ ] 🔄 **صفحة Order Tracking v1**: شاشة التأكيد مع رقم الطلب + وقت التوصيل المتوقع

### 2.5 Paymob Integration (الأسبوع 5)
- [ ] lib/paymob: HMAC validation + iframe/redirect flow
- [ ] طرق الدفع: Card + Vodafone Cash + Fawry
- [ ] API `/api/paymob/webhook`:
  - التحقق من التوقيع (HMAC) ⚠️ إلزامي قبل الثقة بأي payload
  - تحديث `orders.payment_status` + تفعيل الطلب عند النجاح
  - معالجة الـidempotency (نفس الـtransaction reference = تجاهل)
- [ ] صفحة نجاح/فشل الدفع + retry

**✅ Milestone 2:** الرحلة التالية تعمل كاملة: تصفح ← تخصيص ← سلة ← دفع ← تأكيد (دفع حقيقي عبر Paymob test env)

---

## 🔔 Phase 3 — Tracking & Notifications (الأسبوع 6–7)

### 3.1 Order Tracking Page
- [ ] `/(customer)/orders/[id]`:
  - Timeline بـ4 مراحل الإجبارية: Received ← Preparing ← Out for Delivery ← Delivered
  - **Supabase Realtime subscription** على صف الطلب (latency < 3s)
  - Fallback: polling كل 10s إذا فشل الـrealtime
  - زر "مشكلة في الطلب؟" → contact

### 3.2 Notifications
- [ ] Firebase project + FCM:
  - web: service worker + token registration (بعد إذن المستخدم — لا popup عند أول زيارة)
- [ ] Service layer: عند تغيّر `orders.status` → إرسال push + SMS (fallback تلقائي)
- [ ] SMS عبر Vonage/Twilio: "طلبك #1234 خرج للتوصيل 🛵"
- [ ] جدول notifications لتسجيل كل إرسال + retry عند الفشل

**✅ Milestone 3:** "جاري التحضير → خرج للتوصيل → وصل" هتوصلك إشعارات حقيقية

---

## ⚙️ Phase 4 — Admin Panel (الأسبوع 8)

### 4.1 Dashboard
- [ ] `/admin`: مبيعات اليوم + orders count + orders مفتوحة alert
- [ ] Revenue chart (أسبوعي/شهري) — recharts
- [ ] Top 5 أصناف + KPIs (من SQL views، ليست queries معقدة على الكلاينت)

### 4.2 Orders Management
- [ ] `/admin/orders`: **Realtime feed** (Supabase Realtime على الـorders table) + صوت للطلبات الجديدة
- [ ] تفاصيل الطلب: items + customizations + customer + address
- [ ] تغيير الحالة (buttons flow محدود) + إلغاء مع **إدخال السبب إجباري**
- [ ] فلترة: الحالة + التاريخ + رقم الطلب

### 4.3 Menu Management
- [ ] `/admin/menu`: إضافة/تعديل/أرشفة أصناف + رفع صور إلى Supabase Storage
- [ ] CRUD للـcustomization groups + options مع تحديد min/max
- [ ] toggle "available" فوري (يظهر كـ"نفد" فوراً في الـmenu العام)
- [ ] ⚠️ تعديل سعر صنف مطلوب في طلب نشط = snapshot يحمي الطلب القديم (مغطى في Milestone 1)

**✅ Milestone 4:** الطلب المنفذ من جهة الـcustomer يظهر لحظياً في الـadmin panel ويُدار بالكامل

---

## 👥 Phase 5 — Staff & Reports (الأسبوع 9)

### 5.1 Staff Management (Owner Only)
- [ ] `/admin/staff`: إنشاء حساب + تعيين owner | staff
- [ ] إعادة تعيين كلمة مرور + إيقاف/تفعيل حساب
- [ ] ⚠️ مؤكد على RLS: staff **لا يرى** الصفحات المالية أبداً (not UI hiding)

### 5.2 Reports (Owner Only)
- [ ] تقارير الإيرادات: يومي/أسبوعي/شهري + مقارنة فترات
- [ ] الأصناف الأكثر طلباً + heatmap لساعات الذروة
- [ ] Export CSV (سيرفر-side، مش جيل client)

### 5.3 RBAC Polish
- [ ] Middleware + layout guards لكل مسارات `/admin/*`
- [ ] Audit log بسيط: مَن عدّل مَه (menu/orders/actions)

**✅ Milestone 5:** الأدوار والمسارات مغلقة أمنياً + تقارير قابلة للتصدير

---

## 🧪 Phase 6 — QA & Hardening (الأسبوع 10)

- [ ] E2E flows (Playwright):
  1. Guest: menu ← customize ← cart ← checkout ← Paymob (test) ← tracking
  2. Registered: login ← reorder من history ← loyalty يزيد
  3. Admin: طلب جديد يظهر realtime ← تغيير حالة ← إشعار يصل للعميل
- [ ] Performance (PRD): LCP < 2s على 4G + menu interactive < 1.5s
  - صور: next/image + AVIF/WebP + lazy loading
  - bundle audit + dynamic imports للصفحات الثقيلة
- [ ] Accessibility: WCAG 2.1 AA للفلو الأساسي (axe audit + keyboard nav)
- [ ] Security checklist: RLS penetration على كل جدول، webhook signature، rate limiting على POST/checkout
- [ ] Load testing بسيط على الـcheckout
- [ ] Unit tests للـpricing logic (حساب السعر server-side)
- [ ] UAT: طلبات حقيقية تجريبية مع صاحب المطعم

---

## 🚀 Launch (الأسبوع 11)

- [ ] Production DB + env variables + secrets على Vercel (مع dashboard logs)
- [ ] Domain + SSL + redirects
- [ ] Paymob live credentials + اختبار end-to-end بمبلغ صغير
- [ ] Toggle "نفد" عام + خطط على السيرفر
- [ ] Analytics (Vercel Analytics + GA4): conversion funnel
- [ ] Race-launch checklist يدوي: طلب حقيقي كامل من كل route
- [ ] **GO LIVE** 🎉 + KPI monitoring (AOV, cart abandonment < 30%, fulfillment < 45min)

---

## 📊 ملخص الميلستونات

| # | Milestone | الأسبوع | معيار القبول |
|---|---|---|---|
| M1 | Foundation | 2 | DB + Auth + CI/CD يعمل |
| M2 | Core Ordering | 5 | طلب كامل مدفوع عبر Paymob (test) |
| M3 | Tracking & Notifs | 7 | إشعارات push/SMS حقيقية عند تغيير الحالة |
| M4 | Admin Panel | 8 | طلب يظهر realtime يُدار بالكامل |
| M5 | Staff & Reports | 9 | RBAC محكم + تقارير CSV |
| M6 | QA | 10 | E2E خضراء + أهداف الأداء محققة |
| M7 | Launch | 11 | Go Live على الدومين |

---

## ⚠️ المخاطر الرئيسية والمخففات

| الخطر | التأثير | التخفيف |
|---|---|---|
| تأخير اعتماد Paymob (documents KYC) | يوقف M2 | بدء التسجيل في أسبوع 1 كأول قرارات بالتوازي مع الـscaffolding |
| تعقيد الـcustomization builder (SaaS-like) | scope creep | تحديد v1: bread/doneness/sauce/addons فقط — أي شرط إضافي = backlog |
| webhooks باهتة/hmac خطأ | طلبات مدفوعة مش مفعلة | integration tests + manual replay tool + idempotency |
| mobile UX ضعيف في الـbuilder | ارتفاع الـabandonment | prototyping مبكر في أسبوع 3 قبل البناء النهائي |
| SMS costs | تكلفة تشغيلية | SMS فقط لأهم 2 من 4 تغييرات حالة، والباقي push |

---

## 🔒 Out of Scope v1.0 (مؤكد من PRD — لا تبنى)

❌ Multi-branch ❌ GPS map tracking للمندوب ❌ Mobile native app ❌ Talabat/Elmenus integration ❌ Dine-in ❌ Marketing automation ❌ Coupon system

> أي طلب من هذه القائمة يُسجل في backlog لـv2 ولا يفتح ticket في هذه الخطة.

---

*Implementation Plan — VOGA Luxury Burger Platform — October 2026*
