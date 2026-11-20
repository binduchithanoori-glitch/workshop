---
name: Campus Event Hub
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ffb2b7'
  on-secondary: '#67001b'
  secondary-container: '#b50036'
  on-secondary-container: '#ffc2c4'
  tertiary: '#ffb95f'
  on-tertiary: '#472a00'
  tertiary-container: '#ca8100'
  on-tertiary-container: '#3e2400'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#ffdadb'
  secondary-fixed-dim: '#ffb2b7'
  on-secondary-fixed: '#40000d'
  on-secondary-fixed-variant: '#92002a'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system channels the dynamic rhythm and spontaneous energy of modern collegiate life. Geared toward students, campus organizers, and institutional administrators, the interface balances high-impact social excitement with functional utility. It merges **Modern Glassmorphism** with crisp, structural UI foundations to feel alive, agile, and contemporary without sacrificing operational clarity during high-traffic ticketing and credential management.

Key stylistic pillars:
- **Kinetic & Vibrant:** Luminous accents, high-contrast focal points, and vivid live status indicators communicate real-time momentum.
- **Translucent Depth:** Frosted glassmorphic surfaces, layered blurs, and light-refracting edge highlights emphasize depth and layering without visual clutter.
- **Architectural Utility:** Clean data grouping, compact administrative panels, and streamlined role-switching affordances keep the interface legible across campus rush environments.

## Colors

The palette is engineered around an immersive dark foundation offset by luminous electric hues and high-contrast alert tones. 

- **Primary (`#6366F1` / Electric Indigo):** Anchors core calls to action, selected navigation states, interactive glyphs, and primary event ticketing flows.
- **Secondary (`#F43F5E` / Lively Coral):** Drives urgent visual hierarchy, real-time "Happening Now" signals, sold-out alerts, heart reactions, and high-energy club highlights.
- **Tertiary (`#F59E0B` / Amber Flare):** Designates ticket availability warnings, bookmark statuses, calendar notifications, and badge tiers.
- **Neutral (`#0F172A` / Deep Slate):** Forms the base visual backdrop, paired with stepped slate containers (`#1E293B`, `#334155`) and crisp foreground highlights (`#F8FAFC`) to maximize readability in both low-light and bright outdoor mobile scenarios.

## Typography

The type system pairs **Plus Jakarta Sans** for headlines, display metrics, tags, and interactive labels with **Inter** for sustained body text, descriptions, and data grids.

- **Headlines & Display:** Plus Jakarta Sans features tight letter spacing and geometric character forms that bring an athletic, modern, and energetic tone to event titles and dashboard stats.
- **Body & Data:** Inter provides neutral clarity, high x-height, and superior legibility across ticket manifests, student ID details, schedule itineraries, and administrative logs.
- **Labels & Micro-copy:** Uppercase or semi-bold labels in Plus Jakarta Sans ensure rapid identification for status badges, role switchers, and time-stamped metadata.

## Layout & Spacing

The layout is built on a responsive 12-column fluid grid on desktop, scaling to 8 columns on tablet, and 4 columns on mobile. 

- **Desktop (1200px+):** Fluid 12 columns with 24px (`1.5rem`) gutters and outer page padding of 32px (`2rem`). Split-panel organizer layouts dedicate 4 columns to navigation/metrics and 8 columns to real-time feeds and schedules.
- **Tablet (768px - 1199px):** 8 columns with 20px gutters. Dual-card carousels fold into two-up arrangements; filters transition into collapsable action drawers.
- **Mobile (< 768px):** 4 columns with 16px (`1rem`) gutters and 16px page margins. Bottom navigation bar hosts quick actions; discovery cards adopt vertical single-stack flows with edge-to-edge media previews.
- **Vertical Rhythm:** Element gaps within components adhere strictly to standard 4px/8px multiples (`space-xs` through `space-xl`) to preserve rapid scanning speed.

## Elevation & Depth

Visual hierarchy uses frosted glassmorphic surfaces coupled with colored ambient glows over deep slate backdrops:

- **Base Layer (Canvas):** Solid background at `#0F172A`.
- **Level 1 (Structural Containers & Cards):** Translucent fill of `#1E293B` at 70% opacity, accompanied by `backdrop-filter: blur(16px)` and a fine 1px inset border of `rgba(255, 255, 255, 0.08)`.
- **Level 2 (Interactive Overlays & ID Switchers):** Floating menus and role switchers utilize `#1E293B` at 85% opacity, `backdrop-filter: blur(24px)`, a 1px border of `rgba(99, 102, 241, 0.25)`, and an ambient drop shadow: `0 12px 32px -4px rgba(0, 0, 0, 0.5), 0 0 16px rgba(99, 102, 241, 0.15)`.
- **Level 3 (Modal Dialogs & Ticketing Drawers):** `#0F172A` at 95% opacity with an intense ambient halo tinted with the primary hue: `0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 24px rgba(99, 102, 241, 0.2)`.
- **Active Energy Indicator:** Cards hosting live events feature an oscillating ambient rim-light using the Lively Coral tone (`rgba(244, 63, 94, 0.3)`).

## Shapes

The design system employs a refined modern curvature (level `2`) to evoke youthfulness, safety, and touch-friendly responsiveness.

- **Base Corner Radius (0.5rem / 8px):** Standard inputs, list rows, micro-badges, and inner form controls.
- **Large Corner Radius (`rounded-lg`, 1rem / 16px):** Event cards, floating dropdown containers, notification banners, and segmented switch panels.
- **Extra-Large Corner Radius (`rounded-xl`, 1.5rem / 24px):** Hero promotional modules, event check-in modals, and persistent bottom sheets.
- **Pill Shape (`rounded-full`):** Category tags, status pills, action buttons, dynamic live pulses, and student avatar rings.

## Components

### Buttons
- **Primary:** Filled `#6366F1` with white bold label text, transitioning to `#4F46E5` on hover. Accompanied by a subtle drop shadow: `0 4px 14px rgba(99, 102, 241, 0.35)`. Corner radius: `0.5rem`.
- **Secondary:** Semi-transparent slate (`rgba(30, 41, 59, 0.7)`) with a 1px border of `rgba(255, 255, 255, 0.12)` and primary-tinted text on hover.
- **Destructive / Urgent:** Filled `#F43F5E` with high-contrast white text for ticket cancellations, critical alerts, and event withdrawals.

### Chips & Status Badges
- **Live Now Pill:** Coral background (`rgba(244, 63, 94, 0.15)`) with solid `#F43F5E` text, featuring an animated 6px pulsating dot.
- **Category Filter Chips:** Rounded pill shape with `rgba(255, 255, 255, 0.06)` fill. Active state toggles to solid `#6366F1` fill with crisp white text.
- **Capacity / Waitlist Chip:** Amber background (`rgba(245, 158, 11, 0.15)`) with `#F59E0B` text for "Selling Fast" or "5 Spots Left".

### Event Cards
- Built using Level 1 glassmorphic containers. Top 55% hosts a 16:9 media cover with an integrated bookmark floating action button and category chip.
- Bottom 45% features date badges (bold month over large numeric day), event title in `title-md`, venue metadata in `body-sm`, and an avatar stack of attending campus peers.
- Hover state: Subtle lift (`translateY(-4px)`) and edge brightening via `rgba(99, 102, 241, 0.4)`.

### Glassmorphic Role & Student ID Switcher
- Floating selector anchored in the navigation bar. 
- Trigger displays active profile thumbnail, active campus role (e.g., "Student", "Club Lead", "Campus Admin"), and a chevron.
- Dropdown panel applies Level 2 glassmorphism (`backdrop-filter: blur(24px)`). Houses a digital NFC student pass preview, fast role toggle switches, and institution affiliation metadata.

### Form Inputs & Checkboxes
- **Inputs:** Dark field base (`#1E293B`) with a 1px border (`rgba(255, 255, 255, 0.1)`). Focus state introduces a 2px outer ring in `#6366F1` with zero interior color distortion. Placeholder text set in neutral slate (`#64748B`).
- **Checkboxes & Radios:** 18px rounded squares (checkbox) and circles (radio) with a 1.5px border. Checked state fills with `#6366F1` and displays a bold white checkmark icon.

### Organizer & Admin Control Panels
- Compact data tables with sticky glass headers and alternating row highlights (`rgba(255, 255, 255, 0.02)`).
- Metric scorecards featuring large `headline-lg` numeric values, sparkline charts in electric indigo, and badge indicators for ticket sales conversion rates.