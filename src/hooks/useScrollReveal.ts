'use client'

import { useRef } from 'react'
import { useInView, type UseInViewOptions } from 'framer-motion'

export function useScrollReveal(options?: Omit<UseInViewOptions, 'once' | 'margin'>) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
    ...options
  })

  return { ref, isInView }
}

export function useStaggerReveal(count: number, delay: number = 0.1) {
  const containerRef = useRef<HTMLElement>(null)
  const isInView = useInView(containerRef, { once: true })

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * delay,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  }

  return { containerRef, isInView, variants }
}