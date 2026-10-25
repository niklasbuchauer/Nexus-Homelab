"use client"

import { useState } from "react"
import NebulaSidebar from "@/components/nebula-sidebar"
import NexusConstellationIntro from "@/components/nexus-constellation-intro"
import ThemeSelector from "@/components/theme-selector"
import HalftoneNebula from "@/components/ui/halftone-nebula"
import { THEME_CONFIG } from "@/src/config/theme"

export default function Home() {
  const [activeItem, setActiveItem] = useState("Home")

  return (
    <>
      <main className="relative h-screen w-full overflow-hidden">
        <HalftoneNebula
          height="100vh"
          preset="crimson"
          params={{
            sparkles: THEME_CONFIG.background.starDensity,
            pixel: THEME_CONFIG.background.gridPixelSize,
            bandAngle: 0.9,
            haze: THEME_CONFIG.background.nebulaOpacity,
          }}
          touch="draw"
          className="!fixed inset-0 z-0 h-screen w-full"
        />
      </main>
      <NebulaSidebar activeItem={activeItem} onActiveItemChange={setActiveItem} />
      <ThemeSelector />
      {activeItem === "Home" ? <NexusConstellationIntro /> : null}
    </>
  )
}
