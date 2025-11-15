'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { LucideIcon } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ServiceCardProps {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  color?: string
  index: number
}

export function ServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  features, 
  color = 'primary',
  index 
}: ServiceCardProps) {
  const shouldReduceMotion = useReducedMotion()

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.1
      }
    }
  }

  const iconVariants = {
    hover: { 
      scale: shouldReduceMotion ? 1 : 1.1,
      rotate: shouldReduceMotion ? 0 : 5,
      transition: { duration: 0.3 }
    }
  }

  const colorClasses = {
    primary: 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400',
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400'
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: shouldReduceMotion ? 0 : -5 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-grid-pattern" />

      {/* Icon */}
      <motion.div
        variants={iconVariants}
        whileHover="hover"
        className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
          colorClasses[color as keyof typeof colorClasses]
        )}
      >
        <Icon className="w-6 h-6" />
      </motion.div>

      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>

      {/* Features */}
      <ul className="space-y-2">
        {features.map((feature, featureIndex) => (
          <motion.li
            key={featureIndex}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + featureIndex * 0.05 }}
          >
            <div className={cn(
              "w-2 h-2 rounded-full mr-3",
              colorClasses[color as keyof typeof colorClasses].split(' ')[0].replace('bg-', 'bg-').replace('-100', '-500')
            )} />
            {feature}
          </motion.li>
        ))}
      </ul>

      {/* Hover Effect Border */}
      <div className={cn(
        "absolute inset-0 border-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        "border-primary-500 dark:border-primary-400"
      )} />
    </motion.div>
  )
}