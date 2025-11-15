import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { Header } from '@/components/organisms/Header'
import { Footer } from '@/components/organisms/Footer'
import { Toaster } from '@/components/atoms/Toaster'
import { ClientWrapper } from '@/components/ClientWrapper'
import { locales, type Locale } from '../../../i18n'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
})

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const messages = (await import(`../../../messages/${locale}.json`)).default
  const metadata = messages.metadata.home

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    title: {
      default: metadata.title,
      template: `%s | ${metadata.title}`,
    },
    description: metadata.description,
    keywords: ['web development', 'react', 'next.js', 'portfolio', 'digital agency'],
    authors: [{ name: 'Professional Portfolio' }],
    creator: 'Professional Portfolio',
    publisher: 'Professional Portfolio',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url: '/',
      title: metadata.title,
      description: metadata.description,
      siteName: 'Professional Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      creator: '@yourusername',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Load messages for the current locale
  const messages = (await import(`../../../messages/${locale}.json`)).default

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="min-h-screen">
            <ClientWrapper>{children}</ClientWrapper>
          </main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

