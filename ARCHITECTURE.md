# NEXUS Architecture Manual

This document describes the current Next.js application structure and the safest places to edit its theme, background, logo, and navigation behavior.

## Technology Overview

- Framework: Next.js 16 App Router
- Language: TypeScript with React 19
- Styling: Tailwind CSS v4 imports plus custom CSS in `app/globals.css`
- Motion: `motion/react` for sidebar transitions and native CSS/SVG animation for the logo
- Background: WebGL2 canvas shader implemented in `components/ui/halftone-nebula.tsx`
- Icons: `lucide-react`
- Main route: `/`, rendered by `app/page.tsx`

## File Map

```text
.
├── app/
│   ├── globals.css                 Global CSS, Tailwind tokens, logo animation, responsive navigation styles
│   ├── layout.tsx                  Root HTML shell, fonts, metadata, theme CSS-variable injection
│   └── page.tsx                    Home route, active navigation state, nebula and hero composition
├── components/
│   ├── nebula-sidebar.tsx          Navigation data, desktop/mobile switch, More menu state
│   ├── nexus-constellation-intro.tsx  Masked NEXUS logo, orbit SVG, reveal and idle animation hooks
│   └── ui/
│       ├── halftone-nebula.tsx     WebGL2 nebula, particles, pointer lens, and ripple/shockwave canvas
│       └── sidebar-001.tsx         Reusable desktop sidebar primitives and Framer Motion interactions
├── lib/
│   └── utils.ts                    Shared `cn` class-name merge helper
├── src/config/
│   └── theme.ts                    Single source of truth for colors and visual tuning values
├── public/
│   └── nexus-logo.png              Transparent logo alpha mask used by Next Image and CSS masks
├── next.config.ts                  Next.js configuration
├── tsconfig.json                   TypeScript configuration and `@/*` path alias
├── eslint.config.mjs               ESLint configuration
└── package.json                    Scripts and dependencies
```

### Runtime Composition

`app/page.tsx` renders the full-viewport `HalftoneNebula` first, then `NebulaSidebar`, then the logo intro only while `activeItem === "Home"`.

The canvas is visually behind the UI. The sidebar and logo are positioned above it by their own z-index rules. Navigation changes are currently local state changes for the single-page prototype; the hash links identify each destination but do not load separate routes yet.

## Theme and Configuration

Edit only [src/config/theme.ts](src/config/theme.ts) for normal visual customization. The file exports `THEME_CONFIG`, which contains four groups:

```ts
colors: {
  primary,    // Main active state and primary nebula/shockwave color
  secondary,  // Dark red used for backgrounds and deep logo tones
  glow,       // Bright highlight color
  accent,     // Secondary highlight, including the orbit accent
  darkBg,     // Near-black canvas/page background
}
background: {
  starDensity,     // Number of generated star/spark points
  nebulaOpacity,   // Nebula haze strength passed to the shader
  gridPixelSize,   // Halftone cell size in CSS pixels
}
logo: {
  strokeWidth,          // Logo orbit stroke width
  glowRadius,           // Logo aura shadow radius in pixels
  idleAnimationSpeed,   // Logo gradient-flow duration in seconds
}
sidebar: {
  activeIndicatorColor, // Desktop active line color; defaults to colors.primary
  blurAmount,           // Desktop/mobile glass blur in pixels
}
```

### Changing the Global Primary Color

1. Open `src/config/theme.ts`.
2. Change `themeColors.primary`, for example:

   ```ts
   primary: "#00e5ff",
   ```

3. Keep `sidebar.activeIndicatorColor: themeColors.primary` unless you intentionally want the sidebar indicator to differ.
4. Restart or let the Next.js dev server hot-reload.
5. Check the homepage. The root CSS variable `--theme-primary` and Tailwind token `--accent-pro` will now use the new value.

The primary value is consumed by the logo's red ramp, the WebGL nebula `crimsonColor` and `hotColor`, star coloring, sidebar active text/indicator styling, and mobile navigation accents.

### Changing Background Density and Scale

1. Change `background.starDensity` to increase or reduce generated star points.
2. Change `background.nebulaOpacity` between `0` and `1` to tune haze strength.
3. Change `background.gridPixelSize` to make the halftone cells larger or finer.
4. `app/page.tsx` passes these values into `HalftoneNebula`; do not duplicate literal values there.

The canvas also has lower-level shader defaults in `NEBULA_DEFAULTS`. Change those only for effects that are not represented by the central theme options, such as warp, band angle, lens radius, or vignette.

### Changing Logo Settings

1. Change `logo.strokeWidth` to adjust the orbit track stroke.
2. Change `logo.glowRadius` to adjust the logo aura shadow radius.
3. Change `logo.idleAnimationSpeed` to change the duration of the moving color gradient.
4. The values are converted to CSS variables in `app/layout.tsx` and applied to the logo in `nexus-constellation-intro.tsx`.

### Changing Sidebar Appearance

1. Change `sidebar.blurAmount` for the glass blur.
2. Change `sidebar.activeIndicatorColor` only when the active line should intentionally diverge from `colors.primary`.
3. The desktop sidebar receives the blur as an inline style. The mobile bar reads the shared CSS variables from `app/layout.tsx`.

`app/layout.tsx` is the bridge between TypeScript configuration and CSS. It injects `--theme-primary`, `--theme-secondary`, `--theme-glow`, `--theme-accent`, `--theme-dark-bg`, and the numeric logo/sidebar variables on the root `<html>` element. `app/globals.css` maps those variables into Tailwind-compatible tokens such as `--accent-pro`.

## Component Breakdown

### Hero Logo: `nexus-constellation-intro.tsx`

The component renders a stable `578 / 314` aspect-ratio logo stage:

- `Image` loads `/nexus-logo.png` with `next/image`. The image is visually hidden but preserves the accessible `NEXUS` alternative text and supplies the source alpha shape.
- `.nexus-logo-colored` applies the color gradient through the PNG alpha mask using `mask-image`.
- `.nexus-logo-orbit` is the visible decorative SVG layer.
- Its `viewBox` is `0 0 578 314` and must remain aligned with the PNG proportions.
- The large `<path>` inside `.nexus-logo-orbit-track` defines the orbit around the wordmark and lower ornament.
- Each `<animateMotion>` element moves one orbit runner along that same path.
- `.nexus-logo-sweep` is the one-time masked intro sweep.
- CSS keyframes in `app/globals.css` define the center reveal (`nexus-logo-arrive`), sweep (`nexus-logo-sweep`), gradient flow (`nexus-logo-flow`), aura (`nexus-logo-aura`), and orbit fade-in (`nexus-logo-orbit-awaken`).

The current component does not contain a separate array of vertex nodes or letter-by-letter SVG paths. It uses the transparent PNG for the logo silhouette and a stylized orbit path for energy. If precise line/node animation is added later, keep new paths in this component and keep their coordinates in the same `578 x 314` viewBox.

### Background Canvas: `halftone-nebula.tsx`

This is the performance-sensitive background renderer.

- `NEBULA_DEFAULTS` contains shader defaults. Theme-owned values are sourced from `THEME_CONFIG`.
- `NEBULA_PRESETS` defines alternate complete looks such as `crimson`, `ultraviolet`, `abyssal`, `solar`, and `phosphor`.
- `FRAG` is the WebGL2 fragment shader string. It contains the noise/FBM nebula, halftone quantization, stars, planet, sparks, vignette, and final color composition.
- `VERT` is the full-screen triangle vertex shader.
- `layoutSparkles`, `pushSparkle`, and the `Sparkle` type control generated and user-created star points.
- `toUv` converts pointer coordinates to normalized canvas coordinates.
- `onMove` controls the pointer lamp and parallax target.
- `onDown` creates a user sparkle and writes a ripple into the `uRipple` uniform array.
- `MAX_RIPPLES` and the `ripples` `Float32Array` control the number of active shockwaves.
- The shader's ripple loop expands each wave using `uRipple`, `uRippleSpeed`, and elapsed time.
- The `paint` loop updates uniforms and calls `gl.drawArrays`.
- `ResizeObserver`, `IntersectionObserver`, and `requestAnimationFrame` keep the canvas sized and pause work when it is not visible.

When tuning this file, prefer changing uniforms or `NEBULA_DEFAULTS` over rewriting the shader. Keep the WebGL effect inside the existing animation loop and avoid allocating arrays per frame.

### Sidebar: `sidebar-001.tsx` and `nebula-sidebar.tsx`

`nebula-sidebar.tsx` is the application-specific navigation wrapper:

- `primaryItems` defines Home, Explore, Projects, and About Me.
- `secondaryItems` defines Preferences and Contact.
- `activeItem` and `onActiveItemChange` come from `app/page.tsx`.
- `MobileNavigation` owns the More menu open state, Escape handling, backdrop dismissal, and mobile links.
- CSS in `app/globals.css` hides `.nexus-sidebar-desktop` below `767px` and shows the fixed `.nexus-mobile-bar` instead.

`sidebar-001.tsx` contains the reusable desktop primitives:

- `Sidebar001` creates the fixed glass sidebar.
- `Sidebar001Content` provides the scroll area and hover container.
- `Sidebar001Section` and `Sidebar001Separator` group navigation sections.
- `Sidebar001Item` renders links, the active indicator, hover geometry, and Framer Motion transitions.
- `HoverProvider` tracks the hovered item rectangle.
- `HoverHighlight` animates the translucent hover background.
- `EffectsProvider` persists the optional sidebar effects setting in local storage.
- `layoutId="sb001-active-bar"` lets Framer Motion move the active indicator between items.

The active desktop line uses `THEME_CONFIG.sidebar.activeIndicatorColor`; active text uses `THEME_CONFIG.colors.primary`. Mobile active states use the shared CSS theme variables.

## Troubleshooting and Common Tasks

### SVG Clipping or Misalignment

- Keep the PNG, orbit path, and any future SVG geometry in the same coordinate system.
- The current logo `viewBox` is `0 0 578 314`.
- If an orbit or highlight is cut off, inspect the path extrema first, then expand the `viewBox` or use the existing overflow-safe stage.
- `.nexus-logo-stage` clips to the viewport intentionally to prevent animated orbit geometry from causing mobile horizontal scrolling.
- Use `overflow: visible` on the SVG itself when paths need to extend beyond its internal bounds, but avoid changing the fixed stage to visible on narrow screens.

### Adjusting Mobile Breakpoints

- The mobile navigation breakpoint is `max-width: 767px` in `app/globals.css`.
- The logo has a separate `max-width: 700px` sizing adjustment.
- If changing the breakpoint, update both the desktop wrapper rule and mobile navigation rule together so both views cannot appear at once.
- Test at 320px, 375px, 390px, 430px, and 768px widths.
- Keep `safe-area-inset-bottom` padding on the fixed mobile bar.

### Tuning Framer Motion Transitions

- Desktop sidebar hover behavior is in `HoverHighlight` and `Sidebar001Item`.
- The active bar uses a shared `layoutId`; do not remove it if the indicator should travel smoothly between items.
- Adjust `stiffness` and `damping` together. Higher stiffness feels faster; higher damping removes overshoot.
- Keep hover geometry in `HoverRect` rather than querying layout repeatedly during animation.
- For reduced-motion support, check `prefers-reduced-motion` before adding new continuous motion and provide an immediate stable state.

### Shader or Canvas Failure

- Confirm WebGL2 is available before debugging shader output.
- Check `failed` rendering and browser console shader errors.
- Keep `maxDpr` conservative on mobile devices.
- Use `NEBULA_DEFAULTS` and the theme config for tuning before changing GLSL.

## Development Commands

```bash
npm run dev      # Start the Next.js development server
npm run lint     # Run ESLint
npm run build    # Run the production build and TypeScript checks
npm run start    # Serve the production build
```

When visual behavior changes, verify the real `/` route at desktop and mobile sizes. The logo is only rendered while Home is active, so returning to Home remounts its intro sequence by design.
