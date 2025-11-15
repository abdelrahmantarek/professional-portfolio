'use client'

import { useEffect } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light' as Theme,
      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)

export function useTheme() {
  const { theme, setTheme } = useThemeStore()

  useEffect(() => {
    const root = window.document.documentElement
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const activeTheme = theme === 'system' ? systemTheme : theme

    root.classList.remove('light', 'dark')
    root.classList.add(activeTheme)
  }, [theme])

  return { theme, setTheme }
}