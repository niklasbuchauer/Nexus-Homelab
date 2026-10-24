"use client"

import { useState } from "react"
import NebulaSidebar from "@/components/nebula-sidebar"
import NexusConstellationIntro from "@/components/nexus-constellation-intro"
import HalftoneNebula from "@/components/ui/halftone-nebula"

export default function Home() {
  const [activeItem, setActiveItem] = useState("Home")

  return (
    <>
      <main className="relative h-screen w-full overflow-hidden">
        <HalftoneNebula
          height="100vh"
          preset="crimson"
          params={{ sparkles: 10, bandAngle: 0.9, haze: 0.9 }}
          touch="draw"
          className="!fixed inset-0 z-0 h-screen w-full"
        />
      </main>
      <NebulaSidebar activeItem={activeItem} onActiveItemChange={setActiveItem} />
      {activeItem === "Home" ? <NexusConstellationIntro /> : null}
    </>
  )
}
