import { ServicesSection } from '@/components/organisms/ServicesSection'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.services' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen pt-20">
      <ServicesSection />
    </div>
  )
}

