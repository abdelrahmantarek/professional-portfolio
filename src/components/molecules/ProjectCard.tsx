'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Project } from '@/types'
import { ExternalLink, Github, Calendar, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'

interface ProjectCardProps {
  project: Project
  index: number
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const t = useTranslations('projects.card')
  const locale = useLocale()

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        delay: shouldReduceMotion ? 0 : index * 0.1,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hover: { 
      scale: shouldReduceMotion ? 1 : 1.05,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.article
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: shouldReduceMotion ? 0 : -5 }}
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <motion.div
          variants={imageVariants}
          whileHover="hover"
          className="relative w-full h-full"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index < 3}
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>

        {/* Featured Badge */}
        {project.featured && (
          <span className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
            {t('featured')}
          </span>
        )}

        {/* Technology Tags */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(project.date).toLocaleDateString(locale, {
              month: 'short',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {project.teamSize} {t('teamMembers')}
          </div>
        </div>

        {/* Client Info */}
        <div className="mb-4">
          <span className="text-sm text-gray-500 dark:text-gray-400">{t('client')}: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{project.client}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href={`/projects/${project.id}`}
            className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            {t('viewCaseStudy')}
          </Link>
          
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label="View live project"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
              aria-label="View source code"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  )
}