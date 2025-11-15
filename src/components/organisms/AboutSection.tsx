'use client'

import { motion } from 'framer-motion'
import { Users, Award, Briefcase, Clock, Linkedin, Twitter, Github, Dribbble } from 'lucide-react'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { useTranslations } from 'next-intl'

// Social media icon mapping
const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  dribbble: Dribbble,
}

export function AboutSection() {
  const { ref, isInView } = useScrollReveal()
  const t = useTranslations('about')

  // Team members with translations
  const team = [
    {
      id: 'ceo',
      name: t('team.members.ceo.name'),
      role: t('team.members.ceo.role'),
      bio: t('team.members.ceo.bio'),
      image: '/images/team/ceo.jpg',
      initials: 'AE',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      }
    },
    {
      id: 'cto',
      name: t('team.members.cto.name'),
      role: t('team.members.cto.role'),
      bio: t('team.members.cto.bio'),
      image: '/images/team/cto.jpg',
      initials: 'FS',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
      }
    },
    {
      id: 'designer',
      name: t('team.members.designer.name'),
      role: t('team.members.designer.role'),
      bio: t('team.members.designer.bio'),
      image: '/images/team/designer.jpg',
      initials: 'MH',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        dribbble: 'https://dribbble.com',
      }
    },
  ]

  const stats = [
    { icon: Users, value: '50+', label: t('stats.clients') },
    { icon: Award, value: '25+', label: t('stats.awards') },
    { icon: Briefcase, value: '150+', label: t('stats.projects') },
    { icon: Clock, value: '5+', label: t('stats.experience') },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  }

  return (
    <section ref={ref} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('description')}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Mission & Vision */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('mission.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('mission.description')}
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {t.raw('mission.points').map((point: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 rtl:ml-3 rtl:mr-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {t('vision.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {t('vision.description')}
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                {t.raw('vision.points').map((point: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <span className="w-2 h-2 bg-primary rounded-full mr-3 rtl:ml-3 rtl:mr-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Team */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              {t('team.title')}
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member) => (
                <motion.div
                  key={member.id}
                  variants={itemVariants}
                  className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                >
                  {/* Team member avatar */}
                  <div className="w-32 h-32 bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center relative">
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-primary dark:text-primary-400">
                        {member.initials}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h4>
                  <p className="text-primary dark:text-primary-400 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Social media icons */}
                  <div className="flex justify-center gap-3 rtl:flex-row-reverse">
                    {Object.entries(member.social).map(([platform, url]) => {
                      const Icon = socialIcons[platform as keyof typeof socialIcons]
                      return Icon ? (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 hover:scale-110"
                          aria-label={`${member.name} on ${platform}`}
                          title={platform.charAt(0).toUpperCase() + platform.slice(1)}
                        >
                          <Icon className="w-4 h-4" />
                        </a>
                      ) : null
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}