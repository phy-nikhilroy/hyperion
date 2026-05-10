# Hyperion — Solar Panel Dashboard

Hyperion is a full-stack web application for home solar panel owners. It gives retail consumers a clean interface to monitor live output, track monthly energy, view historical charts, manage maintenance, and read energy reports.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS v4 |
| Backend | Node.js, Express |
| Database | MongoDB Atlas (Mongoose ODM) |
| Cache / Live buffer | Redis (ioredis) |
| Charts | Recharts |
| Scheduler | node-cron |
| Auth | JWT + bcrypt |

---

## Monorepo Structure

```
hyperion/
├── client/               # React + Vite frontend
│   └── src/
│       ├── components/   # Sidebar, Card, TopIcons, layout shell
│       ├── context/      # AuthContext, ThemeContext
│       ├── pages/        # Login, Dashboard, Maintenance, Reports, SystemSettings
│       └── services/     # apiFetch() — attaches JWT, handles 401 globally
├── server/               # Express backend
│   ├── controllers/
│   ├── jobs/             # aggregation.js — midnight cron
│   ├── middleware/
│   ├── models/           # User, Device, TelemetryDaily
│   ├── routes/
│   ├── scripts/          # seed.js, update-user.js (not committed with real data)
│   └── utils/            # redis.js
├── design_guidelines.md
├── scaffolding.md
└── collaboration_guidelines.md
```

---

## Pages & Status

| Page | Owner | Status |
|------|-------|--------|
| Login | All | Complete |
| Dashboard | Nikhil | Complete |
| Maintenance | Nikhil | In progress (static UI done) |
| System Settings | Sweta (potential) | Planned |

---

## Getting Started

### Prerequisites

- Node.js >= 18
- Redis (local: `redis-server`, or use `REDIS_URL` pointing to a managed instance)
- MongoDB Atlas URI (free tier works)

### 1. Clone & install

```bash
git clone https://github.com/<org>/hyperion.git
cd hyperion

cd client && npm install
cd ../server && npm install
```

### 2. Environment variables

```bash
cp server/.env.example server/.env
```

Fill in `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=<random secret>
INGEST_SECRET=<random secret for sensor>
REDIS_URL=redis://localhost:6379
```

### 3. Seed the database (first time only)

```bash
cd server
node scripts/seed.js
```

This creates one Device and 730 days of synthetic TelemetryDaily records.

### 4. Run in development

```bash
# Terminal 1 — backend
cd server && npm run dev

# Terminal 2 — frontend
cd client && npm run dev
```

Frontend: `http://localhost:5173` — Vite proxies all `/api` calls to `localhost:5000`.

---

## Data Pipeline

```
Sensor (30s)  →  POST /api/ingest  →  Redis (live buffer)
                                           ↓ midnight cron
                                       MongoDB (daily aggregates)
                                           ↓ Dashboard query
                                       Redis cache (5–30 min TTL)
```

- **Live data** is read from Redis (`telemetry:current`, 90s TTL).
- **Today's totals** are computed from Redis accumulators.
- **History** is served from MongoDB, cached in Redis.
- **Device info** is served from MongoDB, cached 1 hour.

---

## Design

Card-based layout inspired by Lenovo Vantage. Light/dark mode via Tailwind's `darkMode: 'class'`. All color tokens are defined in `client/src/index.css` (`@theme` block in Tailwind v4) — never hardcode hex values in components. See `design_guidelines.md` for the full design system.

---

## Contributing

Read `collaboration_guidelines.md` first.

- Branch off `dev` — never commit directly to `main` or `dev`.
- Conventional commits: `feat:`, `fix:`, `chore:`, `docs:`.
- PRs require at least one approving review.

---

## License

MIT
