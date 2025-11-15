import { getTranslations } from 'next-intl/server'
import { useTranslations } from 'next-intl'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.blog' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function BlogPage() {
  const t = useTranslations('metadata.blog')
  const common = useTranslations('common')

  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{t('title')}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {common('comingSoon')}
          </p>
        </div>
      </div>
    </div>
  )
}
