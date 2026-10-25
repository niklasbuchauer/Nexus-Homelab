"use client"

import * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

const MotionChevron = motion.create(ChevronRight)
const EFFECTS_KEY = "sidebar-001-effects"

const EffectsContext = React.createContext({
  enabled: true,
  toggle: () => {},
})

function EffectsProvider({
  children,
  defaultEnabled = true,
}: {
  children: React.ReactNode
  defaultEnabled?: boolean
}) {
  const [enabled, setEnabled] = React.useState(() => {
    if (typeof window === "undefined") return defaultEnabled
    const saved = localStorage.getItem(EFFECTS_KEY)
    return saved === null ? defaultEnabled : saved === "true"
  })

  const toggle = React.useCallback(() => {
    setEnabled((previous) => {
      const next = !previous
      localStorage.setItem(EFFECTS_KEY, String(next))
      return next
    })
  }, [])

  const value = React.useMemo(() => ({ enabled, toggle }), [enabled, toggle])
  return <EffectsContext.Provider value={value}>{children}</EffectsContext.Provider>
}

export function useSidebar001Effects() {
  return React.useContext(EffectsContext)
}

type HoverRect = { top: number; height: number; left: number }

const HoverContext = React.createContext<{
  hovered: string | null
  hoverRect: HoverRect | null
  containerRef: React.RefObject<HTMLDivElement | null>
  setHovered: (id: string | null, rect?: HoverRect | null) => void
}>({
  hovered: null,
  hoverRect: null,
  containerRef: { current: null },
  setHovered: () => {},
})

function HoverProvider({
  children,
  containerRef,
}: {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement | null>
}) {
  const [hovered, setHoveredId] = React.useState<string | null>(null)
  const [hoverRect, setHoverRect] = React.useState<HoverRect | null>(null)
  const setHovered = React.useCallback((id: string | null, rect?: HoverRect | null) => {
    setHoveredId(id)
    setHoverRect(rect ?? null)
  }, [])
  const value = React.useMemo(
    () => ({ hovered, hoverRect, containerRef, setHovered }),
    [hovered, hoverRect, containerRef, setHovered],
  )
  return <HoverContext.Provider value={value}>{children}</HoverContext.Provider>
}

function HoverHighlight() {
  const { hovered, hoverRect } = React.useContext(HoverContext)
  const { enabled } = useSidebar001Effects()

  return (
    <AnimatePresence>
      {enabled && hovered && hoverRect ? (
        <motion.div
          key="sidebar-001-hover"
          className="pointer-events-none absolute z-0 rounded-md bg-accent/50"
          initial={false}
          animate={{
            top: hoverRect.top + 2,
            height: hoverRect.height - 4,
            left: hoverRect.left,
            right: 0,
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      ) : null}
    </AnimatePresence>
  )
}

export interface Sidebar001ItemProps {
  href: string
  label: React.ReactNode
  isActive: boolean
  isNew?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export const Sidebar001Item = React.memo(function Sidebar001Item({
  href,
  label,
  isActive,
  isNew,
  className,
  onClick,
}: Sidebar001ItemProps) {
  const itemRef = React.useRef<HTMLDivElement>(null)
  const { hovered, setHovered, containerRef } = React.useContext(HoverContext)
  const isHovered = hovered === href
  const opacity = isActive ? 1 : hovered !== null ? (isHovered ? 1 : 0.7) : 1

  const handleMouseEnter = () => {
    const item = itemRef.current
    const container = containerRef.current
    if (!item || !container) return setHovered(href)
    const itemRect = item.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    setHovered(href, {
      top: itemRect.top - containerRect.top,
      height: itemRect.height,
      left: 25,
    })
  }

  return (
    <div className="relative">
      {isActive ? (
        <motion.span
          layoutId="sb001-active-bar"
          className="pointer-events-none absolute left-[4px] top-1/2 z-10 h-[1.8px] w-[23px] -translate-y-1/2 rounded-full bg-accent-pro"
          style={{ backgroundColor: "var(--theme-primary)" }}
        />
      ) : null}
      <motion.span
        className="pointer-events-none absolute left-0 top-1/2 h-px -translate-y-1/2 bg-foreground/50"
        animate={{ width: isActive ? 0 : isHovered ? 26 : 18 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
      <span className="pointer-events-none absolute left-0 top-0 h-px w-4 bg-foreground/30" />
      <span className="pointer-events-none absolute left-0 top-1/4 h-px w-[13px] bg-foreground/30" />
      <span className="pointer-events-none absolute left-0 top-3/4 h-px w-[13px] bg-foreground/30" />
      <motion.div
        ref={itemRef}
        animate={{ opacity, x: isActive ? 8 : isHovered ? 6 : 0 }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      >
        <a
          href={href}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "relative z-[1] ml-2 flex select-none items-center gap-2 py-1.5 pl-4 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] transition-colors",
            isActive ? "font-medium text-white" : "text-white/70 hover:text-white",
            className,
          )}
        >
          <span className="truncate">{label}</span>
          {isNew ? <span className="size-1.5 shrink-0 rounded-full bg-accent-pro" /> : null}
        </a>
      </motion.div>
    </div>
  )
})

export function Sidebar001Separator({
  children,
  className,
}: {
  children?: React.ReactNode
  className?: string
}) {
  return <div className={cn("mt-2 px-0 py-3.5 text-xs font-medium text-white/40 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]", className)}>{children}</div>
}

export function Sidebar001Group({
  label,
  children,
  defaultOpen = false,
  icon,
  className,
}: {
  label: React.ReactNode
  children: React.ReactNode
  defaultOpen?: boolean
  icon?: React.ReactNode
  className?: string
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)
  const id = React.useId()
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const { setHovered, containerRef } = React.useContext(HoverContext)

  const onMouseEnter = () => {
    const button = buttonRef.current
    const container = containerRef.current
    if (!button || !container) return setHovered(id)
    const buttonRect = button.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    setHovered(id, { top: buttonRect.top - containerRect.top, height: buttonRect.height, left: 0 })
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={() => setHovered(null)}
        className="group relative z-[1] flex w-full select-none items-center gap-1.5 py-1.5 pr-2 text-left drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
      >
        {icon ? <span className="shrink-0 text-white/40 [&_svg]:size-3.5">{icon}</span> : null}
        <span className="flex-1 text-xs text-white/40 transition-colors group-hover:text-white/70">{label}</span>
        <MotionChevron
          size={icon ? 14 : 11}
          strokeWidth={2.5}
          className="mr-1 shrink-0 text-white/40"
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pl-3">{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function Sidebar001Section({
  label,
  children,
  className,
}: {
  label?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      {label ? <Sidebar001Separator>{label}</Sidebar001Separator> : null}
      {children}
    </div>
  )
}

export function Sidebar001Content({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { containerRef } = React.useContext(HoverContext)
  return (
    <div className={cn("no-scrollbar flex-1 overflow-y-auto py-4", className)} data-scroll-viewport>
      <div ref={containerRef} className="relative px-1">
        <HoverHighlight />
        {children}
      </div>
    </div>
  )
}

export interface Sidebar001Props {
  children: React.ReactNode
  className?: string
  defaultEffectsEnabled?: boolean
}

export function Sidebar001({
  children,
  className,
  defaultEffectsEnabled = true,
}: Sidebar001Props) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <EffectsProvider defaultEnabled={defaultEffectsEnabled}>
      <HoverProvider containerRef={containerRef}>
        <aside
          className={cn(
            "fixed left-6 top-1/2 z-50 flex h-auto max-h-[80vh] w-60 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-4 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-md",
            className,
          )}
        >
          {children}
        </aside>
      </HoverProvider>
    </EffectsProvider>
  )
}

export function Sidebar001Header({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("shrink-0 px-3 pb-2 pt-4", className)}>{children}</div>
}

export function Sidebar001Footer({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <div className={cn("shrink-0 border-t border-border/50 px-3 pb-4 pt-2", className)}>{children}</div>
}

export default Sidebar001
