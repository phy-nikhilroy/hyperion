# Hyperion — Design Guidelines

This document is the single source of truth for all design decisions in Hyperion. All UI work must follow these conventions so the product looks and feels consistent across pages and contributors.

The design is inspired by **Lenovo Vantage** — a clean, structured system monitoring interface with strong card-based layouts, clear hierarchy, and a focus on data readability.

---

## 1. Themes

Hyperion supports both **light** and **dark** mode. The active theme is toggled by the user and persisted in `localStorage`. TailwindCSS's `darkMode: 'class'` strategy is used — the `dark` class is applied to the `<html>` element.

All color tokens below must have a value defined for **both** themes.

---

## 2. Color Palette

> These are placeholders. Final colors will be decided during the design phase and filled in here before implementation begins. Do not hardcode hex values in components — always use the Tailwind token names defined in `tailwind.config.js`.

### 2.1 Light Mode

| Token Name              | Tailwind Key              | Placeholder | Usage                                      |
|-------------------------|---------------------------|-------------|--------------------------------------------|
| `color-bg-base`         | `bg-light-base`           | `#PLACEHOLDER` | Page background                          |
| `color-bg-surface`      | `bg-light-surface`        | `#PLACEHOLDER` | Card background                          |
| `color-bg-surface-alt`  | `bg-light-surface-alt`    | `#PLACEHOLDER` | Alternate/hover card background          |
| `color-border`          | `border-light-border`     | `#PLACEHOLDER` | Card borders, dividers                   |
| `color-text-primary`    | `text-light-primary`      | `#PLACEHOLDER` | Headings, key values                     |
| `color-text-secondary`  | `text-light-secondary`    | `#PLACEHOLDER` | Labels, descriptions, meta info          |
| `color-text-muted`      | `text-light-muted`        | `#PLACEHOLDER` | Timestamps, disabled states              |
| `color-accent`          | `bg-light-accent`         | `#PLACEHOLDER` | Primary buttons, active nav items, highlights |
| `color-accent-hover`    | `bg-light-accent-hover`   | `#PLACEHOLDER` | Hover state for accent elements          |
| `color-success`         | `text-light-success`      | `#PLACEHOLDER` | Online status, healthy readings          |
| `color-warning`         | `text-light-warning`      | `#PLACEHOLDER` | Low battery, maintenance due             |
| `color-danger`          | `text-light-danger`       | `#PLACEHOLDER` | Faults, errors, critical alerts          |
| `color-sidebar-bg`      | `bg-light-sidebar`        | `#PLACEHOLDER` | Sidebar background                       |

### 2.2 Dark Mode

| Token Name              | Tailwind Key              | Placeholder | Usage                                      |
|-------------------------|---------------------------|-------------|--------------------------------------------|
| `color-bg-base`         | `dark:bg-dark-base`       | `#PLACEHOLDER` | Page background                          |
| `color-bg-surface`      | `dark:bg-dark-surface`    | `#PLACEHOLDER` | Card background                          |
| `color-bg-surface-alt`  | `dark:bg-dark-surface-alt`| `#PLACEHOLDER` | Alternate/hover card background          |
| `color-border`          | `dark:border-dark-border` | `#PLACEHOLDER` | Card borders, dividers                   |
| `color-text-primary`    | `dark:text-dark-primary`  | `#PLACEHOLDER` | Headings, key values                     |
| `color-text-secondary`  | `dark:text-dark-secondary`| `#PLACEHOLDER` | Labels, descriptions, meta info          |
| `color-text-muted`      | `dark:text-dark-muted`    | `#PLACEHOLDER` | Timestamps, disabled states              |
| `color-accent`          | `dark:bg-dark-accent`     | `#PLACEHOLDER` | Primary buttons, active nav items, highlights |
| `color-accent-hover`    | `dark:bg-dark-accent-hover`| `#PLACEHOLDER` | Hover state for accent elements         |
| `color-success`         | `dark:text-dark-success`  | `#PLACEHOLDER` | Online status, healthy readings          |
| `color-warning`         | `dark:text-dark-warning`  | `#PLACEHOLDER` | Low battery, maintenance due             |
| `color-danger`          | `dark:text-dark-danger`   | `#PLACEHOLDER` | Faults, errors, critical alerts          |
| `color-sidebar-bg`      | `dark:bg-dark-sidebar`    | `#PLACEHOLDER` | Sidebar background                       |

---

## 3. Typography

| Role              | Tailwind Classes                        | Usage                              |
|-------------------|-----------------------------------------|------------------------------------|
| Page Title        | `text-2xl font-semibold`               | Top of each page                   |
| Card Title        | `text-base font-semibold`              | Card header label                  |
| Card Value        | `text-3xl font-bold`                   | Key metric displayed in a card     |
| Card Sublabel     | `text-sm font-normal text-*-secondary` | Unit or description below a value  |
| Body Text         | `text-sm font-normal`                  | General text inside cards          |
| Muted / Meta      | `text-xs text-*-muted`                 | Timestamps, footnotes              |
| Nav Label         | `text-sm font-medium`                  | Sidebar navigation items           |

Font family is set globally via `tailwind.config.js`. Default: **Inter**. Final choice TBD during design phase.

---

## 4. Layout & Spacing

### 4.1 Page Structure

Every page follows this shell:

```
┌──────────┬──────────────────────────────────────┐
│          │  Page Title            🔔  👤         │
│ Sidebar  │  ┌────────┐ ┌────────┐ ┌──────┐      │
│(collapse)│  │ Card   │ │ Card   │ │ Card │      │
│          │  └────────┘ └────────┘ └──────┘      │
│          │  ┌────────┐ ┌────────┐               │
│          │  │ Card   │ │ Card   │               │
│          │  └────────┘ └────────┘               │
└──────────┴──────────────────────────────────────┘
```

The 🔔 and 👤 icons are pinned to the top-right corner of the content area. There is no topbar element.

### 4.2 Spacing Tokens

| Token          | Value      | Usage                                         |
|----------------|------------|-----------------------------------------------|
| Page padding   | `p-6`      | Outer padding of the main content area        |
| Card gap       | `gap-4`    | Space between cards in the grid               |
| Card padding   | `p-5`      | Inner padding inside every card               |
| Section gap    | `mb-8`     | Vertical space between card rows or sections  |
| Sidebar collapsed width | `w-16` | Icons-only sidebar state               |
| Sidebar expanded width  | `w-56` | Icons + labels sidebar state           |
| Sidebar transition      | `duration-300 ease-in-out` | Width animation speed    |

### 4.3 Card Grid

Cards are arranged in a responsive grid using Tailwind's grid utilities:

```
grid grid-cols-1 gap-4
sm:grid-cols-2
lg:grid-cols-3
xl:grid-cols-4
```

Cards should never stretch to fill the full page width without a defined `max-w` on the content container.

---

## 5. Card Component

All cards share the same base style. Do not deviate from this without a design discussion.

```
rounded-2xl border p-5 shadow-sm
bg-light-surface dark:bg-dark-surface
border-light-border dark:border-dark-border
```

### Anatomy of a Card

```
┌────────────────────────────────┐
│  Card Title          [icon]   │  ← header row
│  ─────────────────────────    │  ← optional divider
│                               │
│  3.8 kW                       │  ← primary value
│  Current Output               │  ← sublabel                   
│                               │
│  Last updated: 2 min ago      │  ← meta / footer
└────────────────────────────────┘
```

---

## 6. Sidebar

The sidebar is a **collapsible toggle panel**, not a fixed-width bar.

### States

| State      | Width    | Shows                                   |
|------------|----------|-----------------------------------------|
| Collapsed  | `w-16`   | Hyperion logo icon + nav icons only     |
| Expanded   | `w-56`   | Hyperion logo + nav icons + page labels |

### Behaviour

- **Collapsed by default.** Clicking the Hyperion logo at the top of the sidebar toggles between collapsed and expanded states.
- The expansion is **animated** — use a CSS width transition (`transition-all duration-300 ease-in-out`) so the sidebar slides open smoothly.
- Page labels fade in (`opacity-100`) when expanded and fade out (`opacity-0`) when collapsed, with the same duration so text doesn't overflow during the animation.
- The sidebar sits on top of page content on smaller screens (overlay), and pushes content on larger screens — TBD during implementation.

### Nav Items

- Each nav item contains an **icon** (always visible) and a **label** (visible only when expanded).
- Active page: `color-accent` background, `color-text-primary` label.
- Inactive: `color-text-secondary` icon and label, hover state `color-bg-surface-alt`.
- A **theme toggle** sits at the bottom of the sidebar (icon only when collapsed, icon + label when expanded).

### Layout Skeleton

```
Collapsed          Expanded
┌──────┐           ┌────────────────┐
│  ⬡   │           │  ⬡  Hyperion   │   ← logo / toggle
│  ──  │           │  ──────────    │
│  🏠  │           │  🏠  Dashboard │
│  🔧  │           │  🔧  Maintenance│
│  📊  │           │  📊  Reports   │
│  ⚙️  │           │  ⚙️  Settings  │
│      │           │                │
│  ☀️  │           │  ☀️  Light Mode │   ← theme toggle
└──────┘           └────────────────┘
```

---

## 7. Top-Right Corner Icons

There is **no topbar**. Instead, two floating icons are pinned to the **top-right corner** of the main content area:

- **Notifications icon** — opens a dropdown listing recent alerts (faults, maintenance reminders, energy milestones).
- **Profile icon** — opens a dropdown with links to account settings, help, and logout.

### Specs

- Position: `fixed top-4 right-4` (or `absolute` within the page shell, TBD during implementation).
- Icon size: `size-5` (20px), wrapped in a clickable button with `p-2 rounded-full` and a hover background of `color-bg-surface-alt`.
- Dropdowns use the same card surface color (`color-bg-surface`) and border (`color-border`) tokens, with `rounded-xl shadow-md` and a minimum width of `w-56`.
- Dropdowns close on outside click.

---

## 8. Buttons

| Variant   | Tailwind Classes                                                                 |
|-----------|----------------------------------------------------------------------------------|
| Primary   | `bg-light-accent dark:bg-dark-accent text-white rounded-lg px-4 py-2 text-sm`   |
| Secondary | `border border-light-border dark:border-dark-border rounded-lg px-4 py-2 text-sm` |
| Danger    | `bg-light-danger dark:bg-dark-danger text-white rounded-lg px-4 py-2 text-sm`   |
| Ghost     | `text-light-accent dark:text-dark-accent hover:underline text-sm`               |

---

## 9. Status Indicators

Used inside cards to show device health at a glance.

| Status    | Color Token       | Dot + Label Example       |
|-----------|-------------------|---------------------------|
| Online    | `color-success`   | `● Online`                |
| Warning   | `color-warning`   | `● Attention Required`    |
| Offline   | `color-danger`    | `● Offline`               |
| Unknown   | `color-text-muted`| `● Unknown`               |

---

## 10. Icons

Use **Lucide React** for all icons. Icons inside cards should be `size-5` (20px). Sidebar nav icons should be `size-4` (16px). Topbar action icons should be `size-5`.

---

## 11. Tailwind v4 Config

This project uses **TailwindCSS v4**, which is configured entirely in CSS — there is no `tailwind.config.js`. Color tokens and the dark mode variant are defined in `client/src/index.css` using `@theme` and `@custom-variant`.

Never write raw hex values in JSX — always use the token class name (e.g. `bg-light-accent`, `text-dark-muted`).

```css
/* client/src/index.css */
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
  /* Light theme */
  --color-light-base:          #PLACEHOLDER;
  --color-light-surface:       #PLACEHOLDER;
  --color-light-surface-alt:   #PLACEHOLDER;
  --color-light-border:        #PLACEHOLDER;
  --color-light-primary:       #PLACEHOLDER;
  --color-light-secondary:     #PLACEHOLDER;
  --color-light-muted:         #PLACEHOLDER;
  --color-light-accent:        #PLACEHOLDER;
  --color-light-accent-hover:  #PLACEHOLDER;
  --color-light-success:       #PLACEHOLDER;
  --color-light-warning:       #PLACEHOLDER;
  --color-light-danger:        #PLACEHOLDER;
  --color-light-sidebar:       #PLACEHOLDER;

  /* Dark theme */
  --color-dark-base:           #PLACEHOLDER;
  --color-dark-surface:        #PLACEHOLDER;
  --color-dark-surface-alt:    #PLACEHOLDER;
  --color-dark-border:         #PLACEHOLDER;
  --color-dark-primary:        #PLACEHOLDER;
  --color-dark-secondary:      #PLACEHOLDER;
  --color-dark-muted:          #PLACEHOLDER;
  --color-dark-accent:         #PLACEHOLDER;
  --color-dark-accent-hover:   #PLACEHOLDER;
  --color-dark-success:        #PLACEHOLDER;
  --color-dark-warning:        #PLACEHOLDER;
  --color-dark-danger:         #PLACEHOLDER;
  --color-dark-sidebar:        #PLACEHOLDER;
}
```

The Vite plugin (`@tailwindcss/vite`) handles compilation — no PostCSS config needed.
