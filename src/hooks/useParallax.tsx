'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'

interface UseParallaxOptions {
  offset?: number[]
  springConfig?: {
    stiffness: number
    damping: number
  }
}

export function useParallax(ref: React.RefObject<HTMLElement>, options: UseParallaxOptions = {}) {
  const { offset = [0, 300], springConfig = { stiffness: 400, damping: 30 } } = options

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const springConfigValue = springConfig
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], offset),
    springConfigValue
  )

  return { y }
}

export function ParallaxSection({ children, className, offset = [0, 300] }: {
  children: React.ReactNode
  className?: string
  offset?: number[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { y } = useParallax(ref, { offset })

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
