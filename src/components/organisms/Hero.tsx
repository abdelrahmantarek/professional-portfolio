'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/atoms/Button'
import { cn } from '@/utils/cn'
import { ArrowRight, Star } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  const t = useTranslations('hero')
  const locale = useLocale()

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
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <section className={cn("relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800", className)}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Star className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {t('badge')}
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
          {t('title')}
          <span className="text-primary"> {t('titleHighlight')}</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          {t('description')}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href={`/${locale}/projects`}>
            <Button size="lg" className="group">
              {t('viewWork')}
              <ArrowRight className="ml-2 rtl:mr-2 rtl:ml-0 h-5 w-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href={`/${locale}/contact`}>
            <Button variant="outline" size="lg">
              {t('getInTouch')}
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">150+</div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.projects')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">50+</div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.clients')}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">5+</div>
            <div className="text-gray-600 dark:text-gray-400">{t('stats.experience')}</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}