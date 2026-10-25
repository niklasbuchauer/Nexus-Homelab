import Image from "next/image"
import { THEME_CONFIG } from "@/src/config/theme"

export default function NexusConstellationIntro() {
  const logoStyle: React.CSSProperties = {
    "--nexus-glow-radius": `${THEME_CONFIG.logo.glowRadius}px`,
    "--nexus-idle-duration": `${THEME_CONFIG.logo.idleAnimationSpeed}s`,
    "--nexus-stroke-width": THEME_CONFIG.logo.strokeWidth,
  } as React.CSSProperties;

  return (
    <div className="nexus-logo-stage" aria-label="NEXUS">
      <div className="nexus-logo-reveal" style={logoStyle}>
        <Image
          className="nexus-logo-art"
          src="/nexus-logo.png"
          alt="NEXUS"
          fill
          sizes="(max-width: 700px) 78vw, 610px"
          priority
        />
        <span className="nexus-logo-colored" aria-hidden="true" />
        <svg className="nexus-logo-orbit" viewBox="0 0 578 314" aria-hidden="true">
          <path
            className="nexus-logo-orbit-track"
            d="M 24,133 C 55,52 161,45 289,112 C 417,45 523,52 554,133 C 534,197 432,220 347,251 C 320,261 302,282 289,300 C 276,282 258,261 231,251 C 146,220 44,197 24,133 Z"
          />
        </svg>
        <span className="nexus-logo-sweep" aria-hidden="true" />
      </div>
    </div>
  )
}
