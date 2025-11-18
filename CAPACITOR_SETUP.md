# دليل إعداد Capacitor للمشروع

# Capacitor Setup Guide

## نظرة عامة | Overview

تم دمج Capacitor بنجاح في مشروع Next.js لتمكين النشر على iOS و Android مع الحفاظ على البنية الحالية.

Capacitor has been successfully integrated into the Next.js project to enable iOS and Android deployment while maintaining the current structure.

---

## المتطلبات الأساسية | Prerequisites

### للتطوير العام | General Development

- Node.js 18+ و npm
- Next.js 14
- معرفة أساسية بـ TypeScript و React

### لتطوير iOS

- macOS
- Xcode 14+
- CocoaPods (`sudo gem install cocoapods`)
- حساب Apple Developer (للنشر)

### لتطوير Android

- Android Studio
- Java Development Kit (JDK) 11+
- Android SDK
- Gradle (يأتي مع Android Studio)

---

## التثبيت | Installation

### 1. تثبيت المكتبات | Install Dependencies

تم تثبيت المكتبات التالية:

```bash
npm install --save @capacitor/core @capacitor/cli @capacitor/app @capacitor/splash-screen @capacitor/status-bar
npm install --save-dev @capacitor/ios @capacitor/android
```

### 2. الملفات المُعدّلة | Modified Files

#### `next.config.js`

تم تكوين Next.js للتصدير الثابت:

- `output: 'export'` - تفعيل Static Export
- `images.unoptimized: true` - تعطيل تحسين الصور
- `trailingSlash: true` - إضافة trailing slash للمسارات

#### `capacitor.config.ts`

ملف تكوين Capacitor الرئيسي:

- `appId`: `com.professional.portfolio`
- `appName`: `Professional Portfolio`
- `webDir`: `out` - مجلد الإخراج من Next.js

#### `i18n.ts`

تم تعديله لدعم Static Export:

- استخدام `locale` بدلاً من `requestLocale`
- إزالة الاعتماد على `headers()`

#### `package.json`

إضافة سكريبتات Capacitor:

```json
{
  "export": "next build && node scripts/post-export.js",
  "cap:sync": "npm run export && npx cap sync",
  "cap:sync:ios": "npm run export && npx cap sync ios",
  "cap:sync:android": "npm run export && npx cap sync android",
  "cap:open:ios": "npx cap open ios",
  "cap:open:android": "npx cap open android",
  "mobile:build": "npm run export && npx cap sync",
  "mobile:ios": "npm run cap:sync:ios && npx cap open ios",
  "mobile:android": "npm run cap:sync:android && npx cap open android"
}
```

---

## البناء والتطوير | Build & Development

### 1. بناء المشروع | Build Project

```bash
# بناء Next.js وتصديره
npm run export

# مزامنة مع Capacitor
npx cap sync
```

### 2. تطوير iOS

```bash
# مزامنة وفتح Xcode
npm run mobile:ios

# أو خطوة بخطوة
npm run cap:sync:ios
npx cap open ios
```

في Xcode:

1. اختر جهاز أو محاكي
2. اضغط على زر Run (▶️)
3. تأكد من إعدادات Signing & Capabilities

### 3. تطوير Android

```bash
# مزامنة وفتح Android Studio
npm run mobile:android

# أو خطوة بخطوة
npm run cap:sync:android
npx cap open android
```

في Android Studio:

1. انتظر حتى ينتهي Gradle Sync
2. اختر جهاز أو محاكي
3. اضغط على زر Run (▶️)

---

## القيود والتعديلات المطلوبة | Constraints & Required Adjustments

### ❌ الميزات غير المدعومة | Unsupported Features

1. **Server-Side Rendering (SSR)**

   - لا يعمل في Static Export
   - استخدم Static Generation بدلاً منه

2. **API Routes**

   - `/pages/api/*` لا تعمل
   - استخدم API خارجي أو Firebase/Supabase

3. **Image Optimization**

   - تم تعطيل `next/image` optimization
   - الصور تُحمّل بدون تحسين تلقائي

4. **Middleware**

   - Next.js middleware لا يعمل في Static Export
   - تم نقل منطق اللغة إلى client-side

5. **Dynamic Routes with getServerSideProps**
   - استخدم `generateStaticParams` بدلاً منه

### ✅ الحلول المُطبّقة | Applied Solutions

1. **Internationalization (i18n)**

   - تم تعديل `i18n.ts` لاستخدام `locale` parameter
   - إعادة توجيه اللغة في `public/redirect.html`

2. **Dynamic Routes**

   - استخدام `generateStaticParams` في `[slug]/page.tsx`
   - توليد جميع الصفحات مسبقاً

3. **Post-Build Processing**
   - سكريبت `scripts/post-export.js` لمعالجة ما بعد البناء
   - نسخ redirect.html إلى index.html
   - إنشاء .nojekyll file

---

## هيكل المشروع | Project Structure

```
professional-portfolio/
├── android/                 # مشروع Android
├── ios/                     # مشروع iOS
├── out/                     # مخرجات Next.js (webDir)
├── public/
│   └── redirect.html       # صفحة إعادة توجيه اللغة
├── scripts/
│   └── post-export.js      # معالجة ما بعد البناء
├── src/
│   └── app/                # Next.js App Router
├── capacitor.config.ts     # تكوين Capacitor
├── next.config.js          # تكوين Next.js
└── package.json
```

---

## استكشاف الأخطاء | Troubleshooting

### مشكلة: البناء يفشل مع "Dynamic server usage"

**الحل**: تأكد من عدم استخدام `headers()`, `cookies()`, أو `searchParams` بدون `generateStaticParams`

### مشكلة: الصور لا تظهر في التطبيق

**الحل**: تأكد من استخدام مسارات نسبية أو absolute URLs للصور

### مشكلة: التطبيق يتوقف على شاشة التحميل (Splash Screen)

**الحل**: تم حل هذه المشكلة بنسخ `ar/index.html` إلى `index.html` في الجذر. السكريبت `post-export.js` يقوم بذلك تلقائياً.

### مشكلة: Android Gradle Plugin غير متوافق (AGP 8.7.2)

**الخطأ**: "The project is using an incompatible version (AGP 8.7.2) of the Android Gradle plugin. Latest supported version is AGP 8.6.0"

**الحل**: تم تخفيض AGP إلى 8.6.0 في `android/build.gradle`:

```gradle
classpath 'com.android.tools.build:gradle:8.6.0'
```

ثم نظّف وأعد البناء:

```bash
cd android && ./gradlew clean && cd ..
npx cap sync android
```

### مشكلة: Java 21 غير متوافق (invalid source release: 21)

**الخطأ**: "Execution failed for task ':capacitor-android:compileDebugJavaWithJavac'. > error: invalid source release: 21"

**السبب**: Capacitor 7.x يتطلب Java 21، لكن النظام يحتوي على Java 17 فقط.

**الحل**: تخفيض Capacitor إلى الإصدار 6.x الذي يعمل مع Java 17:

```bash
npm install @capacitor/core@^6.0.0 @capacitor/cli@^6.0.0 @capacitor/app@^6.0.0 @capacitor/splash-screen@^6.0.0 @capacitor/status-bar@^6.0.0 @capacitor/android@^6.0.0 @capacitor/ios@^6.0.0
```

ثم إضافة Java 17 compatibility في `android/app/build.gradle`:

```gradle
compileOptions {
    sourceCompatibility JavaVersion.VERSION_17
    targetCompatibility JavaVersion.VERSION_17
}
```

ثم إعادة المزامنة والبناء:

```bash
npx cap sync
cd android && ./gradlew clean && ./gradlew assembleDebug
```

### مشكلة: Gradle Sync يأخذ وقتاً طويلاً

**الحل**: هذا طبيعي في المرة الأولى. انتظر حتى ينتهي التحميل

### مشكلة: CocoaPods install يفشل

**الحل**:

```bash
cd ios/App
pod install --repo-update
```

---

## الخطوات التالية | Next Steps

1. ✅ اختبار التطبيق على iOS Simulator
2. ✅ اختبار التطبيق على Android Emulator
3. 📱 اختبار على أجهزة حقيقية
4. 🎨 تخصيص الأيقونات و Splash Screens
5. 📦 إعداد للنشر على App Store و Google Play

---

## موارد مفيدة | Useful Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Next.js Static Export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Capacitor iOS Guide](https://capacitorjs.com/docs/ios)
- [Capacitor Android Guide](https://capacitorjs.com/docs/android)

---

**تم الإعداد بنجاح! ✨**
**Setup Complete! ✨**
