# Hyperion — Scaffolding Guide

This document tells you exactly what has been built already, where to find it, and what you need to do to start working on your page. Read this before touching any code.

---

## 1. What's Already Built

### Client (`/client`)

#### Entry Points
| File | What it does |
|------|-------------|
| `src/main.jsx` | App entry — wraps everything in `ThemeProvider` and `AuthProvider` |
| `src/App.jsx` | Router — defines all routes, handles protected route logic |
| `src/index.css` | TailwindCSS v4 setup — all color tokens defined here as `@theme` variables |

#### Context
Both contexts are already wired up globally in `main.jsx`. Just import and use the hook.

| File | Hook | What you get |
|------|------|-------------|
| `src/context/AuthContext.jsx` | `useAuth()` | `{ user, login, logout }` |
| `src/context/ThemeContext.jsx` | `useTheme()` | `{ isDark, toggleTheme }` |

**Example:**
```jsx
import { useAuth } from '../../context/AuthContext'

const { user } = useAuth()
console.log(user.name) // logged-in user's name
```

#### Layout Shell
`src/components/layout/PageShell.jsx` is the wrapper for every protected page. It renders:
- The collapsible **Sidebar** on the left
- The **Notifications** and **Profile** icons pinned to the top-right
- An `<Outlet />` where your page content appears

You do not need to touch `PageShell.jsx`. Your page component is what goes inside the outlet.

#### Sidebar (`src/components/Sidebar/Sidebar.jsx`)
- Collapsed by default (`w-16`) — shows icons only
- Click the **H** logo at the top to expand (`w-56`) — shows icons + page labels
- Animates with a 300ms ease transition
- Theme toggle button at the bottom switches light/dark mode
- Active nav item is highlighted automatically via React Router's `NavLink`

#### Top-Right Icons
| File | Behaviour |
|------|----------|
| `src/components/TopIcons/NotificationsDropdown.jsx` | Bell icon — opens a dropdown, closes on outside click |
| `src/components/TopIcons/ProfileDropdown.jsx` | User icon — shows name/email, Logout button |

#### Shared UI
`src/components/ui/Card.jsx` — the standard card component every page uses.

```jsx
import Card from '../../components/ui/Card'
import { Wrench } from 'lucide-react'

<Card title="Card Title" icon={Wrench}>
  <p>Your content here</p>
</Card>
```

Props:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | No | Card header label |
| `icon` | Lucide component | No | Icon shown in the top-right of the card header |
| `children` | ReactNode | Yes | Card body content |
| `className` | string | No | Extra Tailwind classes on the outer div |

#### Pages

| Page | File | Owner | Status |
|------|------|-------|--------|
| Login | `src/pages/Login/Login.jsx` | — | Complete |
| Dashboard | `src/pages/Dashboard/Dashboard.jsx` | Nikhil | Complete |
| **Maintenance** | `src/pages/Maintenance/Maintenance.jsx` | Nikhil | In progress |
| **System Settings** | `src/pages/SystemSettings/SystemSettings.jsx` | Sweta (potential) | Planned |

#### Routing
Routes are already declared in `App.jsx`. You do not need to add a new route for your page — it already exists.

| URL | Component |
|-----|-----------|
| `/login` | Login |
| `/dashboard` | Dashboard |
| `/maintenance` | Maintenance |
| `/reports` | Reports |
| `/settings` | SystemSettings |

All routes under `/` are protected — unauthenticated users are redirected to `/login` automatically.

---

### Server (`/server`)

#### Entry Point
`server/index.js` — starts the Express server, connects to MongoDB and Redis, starts the cron job, mounts routes.

```
GET  /api/health                  → { status: 'ok' }
POST /api/auth/register
POST /api/auth/login
POST /api/ingest                  → telemetry ingest (x-ingest-secret header, no JWT)
GET  /api/telemetry/live          → current sensor reading from Redis (JWT required)
GET  /api/telemetry/today         → today's accumulation from Redis (JWT required)
GET  /api/telemetry/history?days= → MongoDB daily records, Redis-cached (JWT required)
GET  /api/device                  → device info, Redis-cached 1hr (JWT required)
```

#### Auth Flow (already complete)
| File | What it does |
|------|-------------|
| `models/User.js` | Mongoose user schema — password is hashed automatically on save |
| `controllers/authController.js` | `register` and `login` handlers, issues 7-day JWT |
| `routes/authRoutes.js` | Mounts `/register` and `/login` on `/api/auth` |
| `middleware/authMiddleware.js` | `protect` middleware — attach to any route that needs auth |

**To protect a new server route:**
```js
import { protect } from '../middleware/authMiddleware.js'

router.get('/my-data', protect, myController)
// req.user is the authenticated user inside the handler
```

#### Adding Your Own Routes
1. Create your controller in `controllers/`
2. Create your route file in `routes/`
3. Mount it in `server/index.js`:
```js
import myRoutes from './routes/myRoutes.js'
app.use('/api/my-resource', myRoutes)
```

---

## 2. Color Tokens (Design Placeholders)

Colors are defined in `client/src/index.css` as TailwindCSS v4 `@theme` variables. The **accent colors are placeholders** — they will be filled in once the design phase is finalised. The neutral palette (backgrounds, borders, text) is already set.

**Always use the token class names in JSX — never hardcode hex values.**

| What | Light class | Dark class |
|------|-------------|------------|
| Page background | `bg-light-base` | `dark:bg-dark-base` |
| Card background | `bg-light-surface` | `dark:bg-dark-surface` |
| Hover background | `bg-light-surface-alt` | `dark:bg-dark-surface-alt` |
| Border | `border-light-border` | `dark:border-dark-border` |
| Heading / value | `text-light-primary` | `dark:text-dark-primary` |
| Label / description | `text-light-secondary` | `dark:text-dark-secondary` |
| Timestamp / muted | `text-light-muted` | `dark:text-dark-muted` |
| Primary action | `bg-light-accent` | `dark:bg-dark-accent` |
| Success / online | `text-light-success` | `dark:text-dark-success` |
| Warning | `text-light-warning` | `dark:text-dark-warning` |
| Error / danger | `text-light-danger` | `dark:text-dark-danger` |

For a full reference on layout, spacing, typography, card anatomy, buttons, and status indicators, see `design_guidelines.md`.

---

## 3. Getting Started (First-Time Setup)

```bash
# 1. Clone the repo
git clone https://github.com/<org>/hyperion.git
cd hyperion

# 2. Install dependencies
cd client && npm install
cd ../server && npm install

# 3. Set up environment variables
cp server/.env.example server/.env
# Fill in MONGO_URI, JWT_SECRET, INGEST_SECRET, REDIS_URL

# 4. Seed the database (first time only)
cd server && node scripts/seed.js

# 5. Run the dev servers (two terminals)
# Terminal 1 — backend (also starts Redis cron job)
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Frontend: `http://localhost:5173`  
Backend: `http://localhost:5000`

The Vite dev server automatically proxies all `/api` requests to the backend — no CORS issues during development.

---

## 4. Starting Work on Your Page

```bash
# Branch off the latest dev
git checkout dev
git pull origin dev
git checkout -b feature/<your-name>/<short-description>
# e.g. feature/nikhil/maintenance-filter-panel
```

Open your page file:
- Nikhil → `client/src/pages/Maintenance/Maintenance.jsx`
- Sweta (potential) → `client/src/pages/SystemSettings/SystemSettings.jsx`

The shell is there — replace the placeholder cards with the real UI. Use the `Card` component and the color token classes throughout.

When you're ready to merge, open a PR into `dev`. See `collaboration_guidelines.md` for commit message format and PR rules.

---

## 5. Icons

All icons come from **Lucide React**. It is already installed.

```jsx
import { Wrench, BarChart3, Settings, Sun, Zap } from 'lucide-react'

<Wrench size={20} className="text-light-secondary dark:text-dark-secondary" />
```

Browse the full icon set at [lucide.dev](https://lucide.dev).
