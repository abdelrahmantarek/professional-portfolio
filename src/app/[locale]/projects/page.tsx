import { ProjectsGrid } from '@/components/organisms/ProjectsGrid'
import { ProjectsHeader } from '@/components/organisms/ProjectsHeader'
import projectsData from '@/data/projects.json'
import { Project } from '@/types'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.projects' })

  return {
    title: t('title'),
    description: t('description'),
  }
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ProjectsHeader />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <ProjectsGrid projects={projectsData as Project[]} />
      </div>
    </main>
  )
}