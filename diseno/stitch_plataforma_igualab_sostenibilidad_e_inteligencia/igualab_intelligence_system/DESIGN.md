---
name: Igualab Intelligence System
colors:
  surface: '#f8faf9'
  surface-dim: '#d8dada'
  surface-bright: '#f8faf9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f3'
  surface-container: '#eceeed'
  surface-container-high: '#e6e9e8'
  surface-container-highest: '#e1e3e2'
  on-surface: '#191c1c'
  on-surface-variant: '#3f4941'
  inverse-surface: '#2e3131'
  inverse-on-surface: '#eff1f0'
  outline: '#6f7a71'
  outline-variant: '#bec9bf'
  surface-tint: '#066c41'
  primary: '#006038'
  on-primary: '#ffffff'
  primary-container: '#1f7a4d'
  on-primary-container: '#aeffca'
  inverse-primary: '#82d8a3'
  secondary: '#006a61'
  on-secondary: '#ffffff'
  secondary-container: '#84f6e6'
  on-secondary-container: '#007167'
  tertiary: '#6b4f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#896600'
  on-tertiary-container: '#ffebc9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#9ef5be'
  primary-fixed-dim: '#82d8a3'
  on-primary-fixed: '#002110'
  on-primary-fixed-variant: '#00522f'
  secondary-fixed: '#84f6e6'
  secondary-fixed-dim: '#66d9ca'
  on-secondary-fixed: '#00201d'
  on-secondary-fixed-variant: '#005049'
  tertiary-fixed: '#ffdf9f'
  tertiary-fixed-dim: '#f8bd26'
  on-tertiary-fixed: '#261a00'
  on-tertiary-fixed-variant: '#5b4300'
  background: '#f8faf9'
  on-background: '#191c1c'
  surface-variant: '#e1e3e2'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  title-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
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
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
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
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  container-max: 1440px
  sidebar-width: 260px
  gutter: 24px
---

## Brand & Style

The design system is engineered for a sustainability intelligence platform that bridges the gap between environmental data and commercial opportunities. The brand personality is authoritative yet accessible, positioning the NGO as a sophisticated partner in the Peruvian market.

The visual style follows a **Modern Corporate** aesthetic with a strong emphasis on **Minimalism** and **Tactile** depth. It prioritizes clarity and high-density information through:
- **Expansive Whitespace:** Strategic breathing room to reduce cognitive load during complex data analysis.
- **Soft Geometry:** Utilizing 12px-16px radii to humanize the data-heavy interface.
- **Information Hierarchy:** A clear distinction between navigation, intelligence insights, and actionable commercial data.
- **Clarity & Trust:** A "Clean Slate" approach that uses light, airy backgrounds to make the primary brand green feel vibrant and trustworthy.

## Colors

The palette is inspired by the intersection of Peruvian natural landscapes and professional enterprise environments.

- **Primary (Forest Green):** Used for key actions, primary branding, and signifying sustainability "growth."
- **Secondary (Teal):** Used for intelligence-related features, AI interactions, and secondary data visualizations.
- **Background (Sand Light):** A subtle, warm-neutral off-white that reduces eye strain compared to pure white (#FFFFFF), providing a sophisticated canvas for cards.
- **Accent (Amber):** Reserved strictly for alerts, warnings, and high-priority sustainability risks.
- **Neutral Scale:** Grays are infused with a hint of green-teal to maintain a cohesive atmospheric temperature across the platform.

## Typography

This design system utilizes **Inter** exclusively to ensure maximum legibility across dense data tables and technical reports. 

- **Scale:** A modular scale is used to create a clear information hierarchy.
- **Weight:** Semi-bold (600) is used for headers to provide "anchor points" for the eye on white backgrounds. 
- **Language Optimization:** Character spacing and line-heights are adjusted to accommodate the slightly longer average word length of the Spanish language compared to English.
- **Accessibility:** All body text maintains a minimum size of 14px to ensure readability for a wide range of users within the NGO and partner organizations.

## Layout & Spacing

The layout utilizes a **12-column fluid grid** for the main content area, anchored by a fixed left-navigation sidebar.

- **Sidebar:** A persistent 260px navigation bar on the left for quick access to intelligence modules.
- **Main Canvas:** Content is housed in a flexible container with 24px global margins (32px on desktop).
- **Rhythm:** An 8px base grid governs all component-level spacing. 
- **KPI Grid:** Dashboard metrics should be arranged in a responsive grid that shifts from 4 columns (Desktop) to 2 columns (Tablet) to 1 column (Mobile).
- **Padding:** Internal card padding is standardized at 24px (lg) to maintain the "high whitespace" aesthetic.

## Elevation & Depth

Visual hierarchy is achieved through a combination of **Tonal Layering** and **Ambient Shadows**.

- **Level 0 (Background):** The "Sand Light" surface (#f6f8f7) is the base.
- **Level 1 (Cards):** Pure white (#FFFFFF) containers with a 1px border (#e2e8e5).
- **Level 2 (Active/Hover):** A soft, diffused shadow: `0px 4px 20px rgba(0, 0, 0, 0.04)`.
- **Level 3 (Modals/Popovers):** A more defined shadow for depth: `0px 12px 32px rgba(0, 0, 0, 0.08)`.
- **AI Chat Surface:** Uses a subtle inner-glow or a different tint (Secondary color at 5% opacity) to distinguish the "Intelligence" layer from standard data layers.

## Shapes

The design system uses a **Rounded** shape language to evoke friendliness and modern innovation.

- **Standard Radius:** 12px for KPI cards, input fields, and small containers.
- **Large Radius (rounded-lg):** 16px for primary dashboard modules and large modals.
- **Buttons:** 8px radius for a professional, "stable" appearance, or fully pill-shaped (rounded-xl) for floating action buttons or chips.
- **Tables:** Outer containers of tables should have a 12px radius with `overflow: hidden` to ensure the clean aesthetic is maintained.

## Components

### Buttons & Inputs
- **Primary Button:** Solid Forest Green with white text. High contrast, 12px horizontal padding.
- **Secondary Button:** Outline in Forest Green or solid Teal for "Intelligence" specific actions.
- **Input Fields:** 12px rounded corners, 1px border (#e2e8e5). On focus, the border transitions to Forest Green with a subtle glow.

### KPI Cards
- Large "Title-lg" for metrics.
- Small sparkline charts integrated into the background or bottom of the card.
- "Label-sm" for units (e.g., "TONELADAS DE CO2").

### AI Chat Interface
- **Message Bubbles:** Rounded 12px; user messages in Primary light tint, AI responses in white with a Secondary Teal border.
- **Source Panels:** A slide-out panel from the right or a bottom "accordion" showing the documentation/data source for AI claims.

### Tables & Data
- **Header:** Light gray background (#f1f3f2), uppercase "Label-sm" text.
- **Rows:** Minimum height 48px to allow for comfortable scanning.
- **Filter Chips:** 32px height, pill-shaped, using a light tint of the Primary color when active.

### Dashboard Charts
- Accessible color palettes using Primary, Secondary, and neutral grays. 
- Always include tooltips with specific data values.
- Use distinct stroke patterns (dashed/solid) if more than 3 data series are present for colorblind accessibility.