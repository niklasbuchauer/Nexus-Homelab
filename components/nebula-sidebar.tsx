"use client"

import { useState } from "react"
import {
  Sidebar001,
  Sidebar001Content,
  Sidebar001Item,
  Sidebar001Section,
} from "@/components/ui/sidebar-001"

export default function NebulaSidebar() {
  const [activeItem, setActiveItem] = useState("Home")

  return (
    <Sidebar001>
      <Sidebar001Content>
        <Sidebar001Section label="Navigation">
          <Sidebar001Item
            href="#home"
            label="Home"
            isActive={activeItem === "Home"}
            onClick={(event) => {
              event.preventDefault()
              setActiveItem("Home")
            }}
          />
          <Sidebar001Item
            href="#explore"
            label="Explore"
            isActive={activeItem === "Explore"}
            onClick={(event) => {
              event.preventDefault()
              setActiveItem("Explore")
            }}
          />
          <Sidebar001Item
            href="#projects"
            label="Projects"
            isActive={activeItem === "Projects"}
            onClick={(event) => {
              event.preventDefault()
              setActiveItem("Projects")
            }}
          />
          <Sidebar001Item
            href="#about-me"
            label="About Me"
            isActive={activeItem === "About Me"}
            onClick={(event) => {
              event.preventDefault()
              setActiveItem("About Me")
            }}
          />
        </Sidebar001Section>
        <Sidebar001Section label="Settings & Info">
          <Sidebar001Item
            href="#preferences"
            label="Preferences"
            isActive={activeItem === "Preferences"}
            onClick={(event) => {
              event.preventDefault()
              setActiveItem("Preferences")
            }}
          />
          <Sidebar001Item
            href="#contact"
            label="Contact"
            isActive={activeItem === "Contact"}
            onClick={(event) => {
              event.preventDefault()
              setActiveItem("Contact")
            }}
          />
        </Sidebar001Section>
      </Sidebar001Content>
    </Sidebar001>
  )
}
