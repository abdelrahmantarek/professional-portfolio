'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Smartphone, Rocket } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function ServicesSection() {
  const t = useTranslations('services')

  const services = [
    {
      icon: Code,
      title: t('items.webDev.title'),
      description: t('items.webDev.description'),
    },
    {
      icon: Palette,
      title: t('items.uiux.title'),
      description: t('items.uiux.description'),
    },
    {
      icon: Smartphone,
      title: t('items.mobile.title'),
      description: t('items.mobile.description'),
    },
    {
      icon: Rocket,
      title: t('items.strategy.title'),
      description: t('items.strategy.description'),
    },
  ]

  return (
    <section id="services" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

