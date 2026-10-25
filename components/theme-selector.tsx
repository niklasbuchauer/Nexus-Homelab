"use client"

import * as React from "react"
import { Check, ChevronDown, Palette } from "lucide-react"
import { PALETTE_OPTIONS } from "@/src/config/theme"
import { useTheme, type PaletteKey } from "@/components/theme-provider"

const paletteEntries = Object.entries(PALETTE_OPTIONS) as Array<[
  PaletteKey,
  (typeof PALETTE_OPTIONS)[PaletteKey],
]>

function formatPaletteName(value: string) {
  return value.replace(/([a-z])([A-Z])/g, "$1 $2")
}

export default function ThemeSelector() {
  const { themeKey, setTheme } = useTheme()
  const [open, setOpen] = React.useState(false)
  const activePalette = PALETTE_OPTIONS[themeKey]

  return (
    <div className="fixed right-5 top-5 z-50">
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-slate-900/80 px-3 py-2 text-xs font-medium text-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-md transition-colors hover:border-(--theme-primary) hover:text-white"
      >
        <Palette size={14} aria-hidden="true" />
        <span
          className="size-3 rounded-full border border-white/30"
          style={{ background: `linear-gradient(135deg, ${activePalette.primary}, ${activePalette.secondary})` }}
        />
        <span>{formatPaletteName(themeKey)}</span>
        <ChevronDown size={14} aria-hidden="true" className={open ? "rotate-180 transition-transform" : "transition-transform"} />
      </button>

      {open ? (
        <div
          className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-[color-mix(in_srgb,var(--theme-primary)_35%,transparent)] bg-slate-900/80 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.5)] backdrop-blur-md"
          role="listbox"
          aria-label="Theme presets"
        >
          {paletteEntries.map(([key, palette]) => {
            const selected = key === themeKey
            return (
              <button
                key={key}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => {
                  setTheme(key)
                  setOpen(false)
                }}
                className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${selected ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/8 hover:text-white"}`}
              >
                <span
                  className="size-5 shrink-0 rounded-md border border-white/25"
                  style={{ background: `linear-gradient(135deg, ${palette.primary}, ${palette.secondary})` }}
                />
                <span className="flex-1">{formatPaletteName(key)}</span>
                {selected ? <Check size={15} style={{ color: palette.primary }} aria-hidden="true" /> : null}
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
