import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { ExternalLink, Github, ArrowLeft, Calendar, Users, Clock } from 'lucide-react'
import Link from 'next/link'
import projectsData from '@/data/projects.json'
import { Project } from '@/types'

interface ProjectPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return projectsData.map((project: Project) => ({
    slug: project.id.toString(),
  }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = projectsData.find((p: Project) => p.id.toString() === params.slug)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} - Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.image],
    },
  }
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projectsData.find((p: Project) => p.id.toString() === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {project.description}
          </p>
        </div>
      </section>

      {/* Project Info */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Project Date</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {new Date(project.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long' 
                })}
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Team Size</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {project.teamSize} team members
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Duration</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {project.duration}
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Technologies Used
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary/10 text-primary rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Case Study Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  The Challenge
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  {project.challenges.map((challenge: string, index: number) => (
                    <p key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      {challenge}
                    </p>
                  ))}
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Solution
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  {project.solutions.map((solution: string, index: number) => (
                    <p key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      {solution}
                    </p>
                  ))}
                </div>
              </div>

              {/* Results */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Results & Impact
                </h2>
                <div className="grid gap-4">
                  {project.results?.map((result: string, index: number) => (
                    <div
                      key={index}
                      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
                    >
                      <p className="text-green-800 dark:text-green-300 font-medium">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Client Info */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Client Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Client</p>
                    <p className="font-medium text-gray-900 dark:text-white">{project.client}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Category</p>
                    <p className="font-medium text-gray-900 dark:text-white capitalize">
                      {project.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-4">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Project
                  </a>
                )}
                
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </a>
                )}
              </div>

              {/* Back to Projects */}
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}