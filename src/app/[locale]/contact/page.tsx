import { ContactSection } from '@/components/organisms/ContactSection'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.contact' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20">
      <ContactSection />
    </div>
  )
}
