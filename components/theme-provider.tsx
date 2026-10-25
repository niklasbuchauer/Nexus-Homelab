"use client"

import * as React from "react"
import { ACTIVE_THEME, PALETTE_OPTIONS, THEME_PRESETS } from "@/src/config/theme"

export type PaletteKey = keyof typeof PALETTE_OPTIONS

type ThemeColors = (typeof THEME_PRESETS)[PaletteKey]

type ThemeContextValue = {
  themeKey: PaletteKey
  colors: ThemeColors
  setTheme: (themeKey: PaletteKey) => void
}

const STORAGE_KEY = "homelab-active-theme"
const ThemeContext = React.createContext<ThemeContextValue | null>(null)

function isPaletteKey(value: string): value is PaletteKey {
  return value in PALETTE_OPTIONS
}

function applyThemeColors(colors: ThemeColors) {
  const root = document.documentElement
  root.style.setProperty("--background", colors.darkBg)
  root.style.setProperty("--foreground", colors.glow)
  root.style.setProperty("--border", colors.secondary)
  root.style.setProperty("--accent", colors.secondary)
  root.style.setProperty("--accent-pro", colors.primary)
  root.style.setProperty("--theme-primary", colors.primary)
  root.style.setProperty("--theme-secondary", colors.secondary)
  root.style.setProperty("--theme-glow", colors.glow)
  root.style.setProperty("--theme-accent", colors.accent)
  root.style.setProperty("--theme-dark-bg", colors.darkBg)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeKey, setThemeKey] = React.useState<PaletteKey>(() => {
    if (typeof window === "undefined") return ACTIVE_THEME as PaletteKey
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved && isPaletteKey(saved) ? saved : (ACTIVE_THEME as PaletteKey)
  })
  const colors = THEME_PRESETS[themeKey]

  React.useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, themeKey)
    applyThemeColors(colors)
  }, [colors, themeKey])

  const value = React.useMemo(() => ({ themeKey, colors, setTheme: setThemeKey }), [colors, themeKey])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (!context) throw new Error("useTheme must be used within ThemeProvider")
  return context
}
