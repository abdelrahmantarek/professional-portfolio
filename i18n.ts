import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'ar'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'ar'

export default getRequestConfig(async ({ locale }) => {
  // For static export, we use the locale from params instead of requestLocale
  // This is passed from the [locale] segment in the URL
  const currentLocale = locale || defaultLocale

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  }
})

