"use client"

import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Item,
  Sidebar001Section,
} from "@/components/ui/sidebar-001"

export default function NebulaSidebar() {
  return (
    <Sidebar001>
      <Sidebar001Content>
        <Sidebar001Section label="Navigation">
          <Sidebar001Item
            href="#home"
            label="Home"
            isActive
            onClick={(event) => event.preventDefault()}
          />
          <Sidebar001Item href="#explore" label="Explore" isActive={false} onClick={(event) => event.preventDefault()} />
          <Sidebar001Item href="#projects" label="Projects" isActive={false} onClick={(event) => event.preventDefault()} />
          <Sidebar001Item href="#about-me" label="About Me" isActive={false} onClick={(event) => event.preventDefault()} />
        </Sidebar001Section>
        <Sidebar001Section label="Settings & Info">
          <Sidebar001Item href="#preferences" label="Preferences" isActive={false} onClick={(event) => event.preventDefault()} />
          <Sidebar001Item href="#contact" label="Contact" isActive={false} onClick={(event) => event.preventDefault()} />
        </Sidebar001Section>
      </Sidebar001Content>
    </Sidebar001>
  )
}
