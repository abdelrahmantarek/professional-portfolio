import { AboutSection } from '@/components/organisms/AboutSection'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.about' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      <AboutSection />
    </div>
  )
}
