export const PALETTE_OPTIONS = {
  cosmicViolet: {
    primary: "#9B78D1",
    secondary: "#4C356F",
    backgroundGlow: "#241A3D",
  },
  deepCyan: {
    primary: "#4BA8B8",
    secondary: "#1F5966",
    backgroundGlow: "#0E2D35",
  },
  electricBlue: {
    primary: "#5B8FE8",
    secondary: "#294A84",
    backgroundGlow: "#142442",
  },
  mutedPlasmaAmber: {
    primary: "#C18A4A",
    secondary: "#704B2B",
    backgroundGlow: "#302217",
  },
  laserEmerald: {
    primary: "#4FAF8D",
    secondary: "#245C4A",
    backgroundGlow: "#102E27",
  },
  nebulaRose: {
    primary: "#C06A86",
    secondary: "#6B334D",
    backgroundGlow: "#321B2A",
  },
} as const

const THEME_PRESETS = {
  default: {
    primary: "#C06A86",          //default: #e63956
    secondary: "#6B334D",        //default: #78112c
    glow: "#321B2A",             //default: #ff3366
    accent: "#e63956",            //default: #e63956    --> Controlls the small star that circles the intro logo
    darkBg: "#030208",            //default: #030208
  },
  cosmicViolet: {
    primary: PALETTE_OPTIONS.cosmicViolet.primary,          // Cosmic purple primary
    secondary: PALETTE_OPTIONS.cosmicViolet.secondary,      // Deep purple secondary
    glow: PALETTE_OPTIONS.cosmicViolet.backgroundGlow,      // Nebula glow
    accent: "#B99AEF",           // Bright accent star
    darkBg: "#0D081A",           // Deep space violet-black
    backgroundGlow: PALETTE_OPTIONS.cosmicViolet.backgroundGlow,
  },
  deepCyan: {
    ...PALETTE_OPTIONS.deepCyan,
    glow: PALETTE_OPTIONS.deepCyan.backgroundGlow,
    accent: "#78D5E2",
    darkBg: "#06171C",
  },
  electricBlue: {
    ...PALETTE_OPTIONS.electricBlue,
    glow: PALETTE_OPTIONS.electricBlue.backgroundGlow,
    accent: "#8CB3FF",
    darkBg: "#080F20",
  },
  mutedPlasmaAmber: {
    ...PALETTE_OPTIONS.mutedPlasmaAmber,
    glow: PALETTE_OPTIONS.mutedPlasmaAmber.backgroundGlow,
    accent: "#E2B46A",
    darkBg: "#140D08",
  },
  laserEmerald: {
    ...PALETTE_OPTIONS.laserEmerald,
    glow: PALETTE_OPTIONS.laserEmerald.backgroundGlow,
    accent: "#77D7AD",
    darkBg: "#061612",
  },
  nebulaRose: {
    ...PALETTE_OPTIONS.nebulaRose,
    glow: PALETTE_OPTIONS.nebulaRose.backgroundGlow,
    accent: "#E89AB0",
    darkBg: "#180B12",
  },
} as const

const ACTIVE_THEME: keyof typeof THEME_PRESETS = "default"
const themeColors = THEME_PRESETS[ACTIVE_THEME]

export const THEME_CONFIG = {
  colors: themeColors,
  background: {
    starDensity: 10,            //default: 10
    nebulaOpacity: 0.5,         //default: 0.5
    gridPixelSize: 3,           //default: 3
  },
  logo: {
    strokeWidth: 1.5,           //default: 1.5
    glowRadius: 20,             //default: 20
    idleAnimationSpeed: 8.5,    //default: 8.5
  },
  sidebar: {
    activeIndicatorColor: themeColors.primary,
    blurAmount: 15,             //default: 15
  },
} as const

export type ThemeConfig = typeof THEME_CONFIG
