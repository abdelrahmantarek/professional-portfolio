'use client'

import { motion } from 'framer-motion'
import { Briefcase } from 'lucide-react'

export function ProjectsHeader() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
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
    <section className="relative py-20 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <motion.div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Icon Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            <Briefcase className="w-4 h-4 mr-2" />
            Our Portfolio
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Our <span className="text-primary">Projects</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          variants={itemVariants} 
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Explore our portfolio of successful projects. From web applications to mobile apps, 
          see how we bring ideas to life with cutting-edge technology and creative solutions.
        </motion.p>
      </motion.div>
    </section>
  )
}
