"use client"

import * as React from "react"
import {
  Compass,
  Ellipsis,
  FolderKanban,
  Home,
  Mail,
  Settings,
  UserRound,
  X,
} from "lucide-react"
import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Item,
  Sidebar001Section,
} from "@/components/ui/sidebar-001"

type NebulaSidebarProps = {
  activeItem: string
  onActiveItemChange: (item: string) => void
}

const primaryItems = [
  { label: "Home", href: "#home", icon: Home },
  { label: "Explore", href: "#explore", icon: Compass },
  { label: "Projects", href: "#projects", icon: FolderKanban },
  { label: "About Me", href: "#about-me", icon: UserRound },
] as const

const secondaryItems = [
  { label: "Preferences", href: "#preferences", icon: Settings },
  { label: "Contact", href: "#contact", icon: Mail },
] as const

function MobileNavigation({
  activeItem,
  onActiveItemChange,
}: NebulaSidebarProps) {
  const [isMoreOpen, setIsMoreOpen] = React.useState(false)

  React.useEffect(() => {
    if (!isMoreOpen) return

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMoreOpen(false)
    }

    document.addEventListener("keydown", closeOnEscape)
    return () => document.removeEventListener("keydown", closeOnEscape)
  }, [isMoreOpen])

  const navigate = (item: string) => {
    onActiveItemChange(item)
    setIsMoreOpen(false)
  }

  const isMoreActive = secondaryItems.some((item) => item.label === activeItem)

  return (
    <div className="nexus-mobile-navigation">
      {isMoreOpen ? (
        <>
          <button
            className="nexus-mobile-backdrop"
            type="button"
            aria-label="Close More menu"
            onClick={() => setIsMoreOpen(false)}
          />
          <section className="nexus-mobile-more" aria-label="More navigation">
            <div className="nexus-mobile-more-heading">
              <span>Settings &amp; Info</span>
              <button
                className="nexus-mobile-close"
                type="button"
                aria-label="Close More menu"
                onClick={() => setIsMoreOpen(false)}
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
            <div className="nexus-mobile-more-links">
              {secondaryItems.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  className={activeItem === label ? "is-active" : undefined}
                  onClick={(event) => {
                    event.preventDefault()
                    navigate(label)
                  }}
                >
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </section>
        </>
      ) : null}

      <nav className="nexus-mobile-bar" aria-label="Primary navigation">
        {primaryItems.map(({ label, href, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className={activeItem === label ? "is-active" : undefined}
            aria-current={activeItem === label ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault()
              navigate(label)
            }}
          >
            <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
        <button
          type="button"
          className={isMoreActive || isMoreOpen ? "is-active" : undefined}
          aria-expanded={isMoreOpen}
          aria-haspopup="dialog"
          onClick={() => setIsMoreOpen((open) => !open)}
        >
          <Ellipsis size={19} strokeWidth={1.8} aria-hidden="true" />
          <span>More</span>
        </button>
      </nav>
    </div>
  )
}

export default function NebulaSidebar({ activeItem, onActiveItemChange }: NebulaSidebarProps) {
  return (
    <>
      <div className="nexus-sidebar-desktop">
        <Sidebar001>
          <Sidebar001Content>
            <Sidebar001Section label="Navigation">
              {primaryItems.map(({ label, href }) => (
                <Sidebar001Item
                  key={href}
                  href={href}
                  label={label}
                  isActive={activeItem === label}
                  onClick={(event) => {
                    event.preventDefault()
                    onActiveItemChange(label)
                  }}
                />
              ))}
            </Sidebar001Section>
            <Sidebar001Section label="Settings & Info">
              {secondaryItems.map(({ label, href }) => (
                <Sidebar001Item
                  key={href}
                  href={href}
                  label={label}
                  isActive={activeItem === label}
                  onClick={(event) => {
                    event.preventDefault()
                    onActiveItemChange(label)
                  }}
                />
              ))}
            </Sidebar001Section>
          </Sidebar001Content>
        </Sidebar001>
      </div>
      <MobileNavigation activeItem={activeItem} onActiveItemChange={onActiveItemChange} />
    </>
  )
}
