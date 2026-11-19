---
name: Obsidian Arcana
colors:
  surface: '#101419'
  surface-dim: '#101419'
  surface-bright: '#36393f'
  surface-container-lowest: '#0a0e13'
  surface-container-low: '#181c21'
  surface-container: '#1c2025'
  surface-container-high: '#262a30'
  surface-container-highest: '#31353b'
  on-surface: '#e0e2ea'
  on-surface-variant: '#e0c0b1'
  inverse-surface: '#e0e2ea'
  inverse-on-surface: '#2d3136'
  outline: '#a78b7d'
  outline-variant: '#584237'
  surface-tint: '#ffb690'
  primary: '#ffb690'
  on-primary: '#552100'
  primary-container: '#f97316'
  on-primary-container: '#582200'
  inverse-primary: '#9d4300'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a985ff'
  on-tertiary-container: '#3e0096'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbca'
  primary-fixed-dim: '#ffb690'
  on-primary-fixed: '#341100'
  on-primary-fixed-variant: '#783200'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#101419'
  on-background: '#e0e2ea'
  surface-variant: '#31353b'
  surface-base: '#0B0F14'
  surface-card: '#121820'
  surface-elevated: '#1A222D'
  border-subtle: '#2A3649'
  mana-white: '#F8FAFC'
  mana-blue: '#06B6D4'
  mana-black: '#94A3B8'
  mana-red: '#EF4444'
  mana-green: '#10B981'
  arcane-gold: '#EAB308'
  ember-glow: rgba(249, 115, 22, 0.15)
  cyan-glow: rgba(6, 182, 212, 0.15)
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
  stat-mono:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
  space-2xl: 4rem
---

## Brand & Style

Dark glassmorphic esports aesthetic for Catalan MTG competitive circuits. Combines Dark Minimalist Dashboard Architecture with Arcane Glassmorphic Surface Tiering.

### Palette Architecture
- **Primary (`#F97316` / Ember Orange):** High-energy orange for CTAs, active states, and win highlights
- **Secondary (`#06B6D4` / Mystic Cyan):** Instant-speed clarity for secondary metrics and deck archetypes
- **Tertiary (`#8B5CF6` / Arcane Purple):** Special league formats and championship indicators
- **Neutral Base (`#0B0F14` / Obsidian Void):** Dark canvas foundation

### Surface Hierarchy
1. `surface-base` (`#0B0F14`): App background
2. `surface-card` (`#121820`): Tournament fixtures and league lists
3. `surface-elevated` (`#1A222D`): Modals, dropdowns, hovered rows

Hairline borders (`#2A3649`) frame all containers with optical separation.

### Typography Rules
- **Display & Headlines:** Plus Jakarta Sans with negative tracking (`-0.02em`)
- **Body & Data Tables:** Inter for dense data readability
- **Numerical Stats:** Inter with `tnum` and `zero` features
- **Badges:** Uppercase label-sm with 0.05em letter spacing

### Elevation System
- Layer 0 (`#0B0F14`): Background canvas
- Layer 1 (`#121820`): Card tier with 1px solid `#2A3649` border
- Layer 2 (`#1A222D`): Elevated tier on hover

Hover transitions: `box-shadow: 0 8px 24px -4px rgba(0, 0, 0, 0.6), 0 0 16px 0 rgba(249, 115, 22, 0.12)`

### Shapes
- Base (0.5rem): Interactive controls and inputs
- Large (1rem): Tournament cards and modals
- Pill (9999px/rounded-full): Mana pips, badges, status indicators
