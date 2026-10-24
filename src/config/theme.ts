const themeColors = {
  primary: "#e63956",           //default: #e63956
  secondary: "#78112c",         //default: #78112c
  glow: "#ff3366",              //default: #ff3366
  accent: "#e63956",            //default: #e63956    --> Controlls the small star that circles the intro logo
  darkBg: "#030208",            //default: #030208
} as const

export const THEME_CONFIG = {
  colors: themeColors,
  background: {
    starDensity: 10,            //default: 10
    nebulaOpacity: 0.9,         //default: 0.9
    gridPixelSize: 6,           //default: 6
  },
  logo: {
    strokeWidth: 1.5,           //default: 1.5
    glowRadius: 20,             //default: 20
    idleAnimationSpeed: 8.5,    //default: 8.5
  },
  sidebar: {
    activeIndicatorColor: themeColors.primary,
    blurAmount: 15,             //default: 18
  },
} as const

export type ThemeConfig = typeof THEME_CONFIG
