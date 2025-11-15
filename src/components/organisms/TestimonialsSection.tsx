'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { useTranslations } from 'next-intl'

const testimonials = [
  {
    name: 'John Doe',
    role: 'CEO, Tech Corp',
    content: 'Outstanding work! The team delivered beyond our expectations and on time.',
    rating: 5,
  },
  {
    name: 'Jane Smith',
    role: 'Product Manager, StartupXYZ',
    content: 'Professional, creative, and highly skilled. A pleasure to work with.',
    rating: 5,
  },
  {
    name: 'Mike Johnson',
    role: 'CTO, Innovation Labs',
    content: 'Their expertise in modern web technologies is truly impressive.',
    rating: 5,
  },
]

export function TestimonialsSection() {
  const t = useTranslations('testimonials')

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-800">
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

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{testimonial.content}</p>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

