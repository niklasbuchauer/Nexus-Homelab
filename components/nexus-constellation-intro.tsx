"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"

const connectionPaths = [
  "M95 292 L165 374 L143 290 L192 388",
  "M184 291 L253 291 L205 388 L270 370",
  "M263 288 L326 391 L349 286 L287 389",
  "M354 290 L397 359 L432 289 L438 374",
  "M433 292 L436 378 L495 379 L506 291",
  "M501 291 L575 294 L518 338 L578 381",
  "M100 424 L207 414 L273 451 L349 510 L427 450 L597 424",
  "M121 442 L232 438 L308 474 L360 535 L414 475 L574 443",
  "M171 407 L251 447 L334 426 L360 493 L388 426 L475 447 L552 407",
  "M277 408 L330 453 L360 514 L393 452 L445 408",
  "M133 359 L224 323 L307 359 L394 322 L493 355 L568 323",
]

const scanLines = Array.from(
  { length: 34 },
  (_, index) => `M82 ${278 + index * 7} L638 ${278 + index * 7}`,
)

const constellationNodes = [
  [112, 290], [144, 322], [169, 375], [195, 290], [223, 335], [258, 375],
  [275, 291], [310, 336], [345, 292], [373, 333], [404, 289], [433, 374],
  [464, 374], [503, 292], [537, 332], [577, 375], [111, 425], [174, 414],
  [230, 438], [280, 451], [328, 426], [360, 512], [392, 426], [443, 451],
  [491, 438], [548, 414], [607, 425],
] as const

const gridNodes = Array.from({ length: 72 }, (_, index) => [
  100 + (index % 12) * 46,
  286 + Math.floor(index / 12) * 38,
])

const stars = [...constellationNodes, ...gridNodes]

export default function NexusConstellationIntro() {
  const [showConstellation, setShowConstellation] = React.useState(true)

  return (
    <AnimatePresence>
      {showConstellation ? (
        <motion.div
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-transparent"
          role="button"
          tabIndex={0}
          aria-label="Dismiss NEXUS constellation intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onClick={(event) => {
            if (event.button === 0) setShowConstellation(false)
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") setShowConstellation(false)
          }}
        >
          <motion.svg
            className="h-auto w-[min(92vw,760px)]"
            viewBox="0 0 720 720"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            shapeRendering="crispEdges"
            textRendering="geometricPrecision"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <defs>
              <mask id="nexus-logo-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="720" height="720">
                <image
                  href="/nexus-logo.jpg"
                  x="0"
                  y="0"
                  width="720"
                  height="720"
                  preserveAspectRatio="xMidYMid meet"
                  imageRendering="crisp-edges"
                />
              </mask>
            </defs>

            <motion.g
              mask="url(#nexus-logo-mask)"
              className="opacity-100"
            >
              {connectionPaths.map((path, index) => (
                <React.Fragment key={path}>
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, delay: index * 0.07, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(241,46,84,0.9)]"
                    stroke="#f12e54"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, delay: index * 0.07, repeat: Infinity, ease: "easeInOut" }}
                  />
                </React.Fragment>
              ))}
              {scanLines.map((path, index) => (
                <React.Fragment key={path}>
                  <motion.path
                    d={path}
                    fill="none"
                    stroke="black"
                    strokeWidth="4"
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, delay: 0.3 + index * 0.025, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.path
                    d={path}
                    fill="none"
                    className="drop-shadow-[0_0_8px_rgba(241,46,84,0.9)]"
                    stroke="#f12e54"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2.5, delay: 0.3 + index * 0.025, repeat: Infinity, ease: "easeInOut" }}
                  />
                </React.Fragment>
              ))}
              {stars.map(([cx, cy], index) => (
                <motion.path
                  key={`${cx}-${cy}`}
                  d={`M${cx - 3} ${cy}H${cx + 3}M${cx} ${cy - 3}V${cy + 3}`}
                  fill="#ffffff"
                  className="drop-shadow-[0_0_6px_#f12e54]"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="square"
                  vectorEffect="non-scaling-stroke"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={{
                    opacity: [0, 1, 0.8],
                    pathLength: 1,
                  }}
                  transition={{
                    opacity: { duration: 1.8 + (index % 4) * 0.25, delay: index * 0.035, repeat: Infinity },
                    pathLength: { duration: 0.25, delay: index * 0.035 },
                  }}
                />
              ))}
            </motion.g>
          </motion.svg>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
