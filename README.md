# Hyperion — Solar Panel Dashboard

Hyperion is a full-stack web application built for home solar panel owners. It gives retail consumers a clean, fast interface to monitor their home solar device analytics, manage system settings, track maintenance, and view energy reports — all in one place.

---

## Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React 18, TailwindCSS               |
| Backend    | Node.js, Express                    |
| Database   | MongoDB (Mongoose ODM)              |
| Auth       | JWT-based authentication            |
| Version Control | Git + GitHub                   |

---

## Monorepo Structure

```
hyperion/
├── client/               # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/   # Shared UI components (cards, sidebar, navbar)
│       ├── pages/        # One folder per page
│       │   ├── Login/
│       │   ├── Dashboard/
│       │   ├── Maintenance/
│       │   ├── Reports/
│       │   └── SystemSettings/
│       ├── hooks/
│       ├── context/
│       ├── services/     # API call functions
│       └── utils/
├── server/               # Express backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── .gitignore
├── README.md
├── design_guidelines.md
└── collaboration_guidelines.md
```

---

## Pages & Ownership

| Page            | Owner  | Status      |
|-----------------|--------|-------------|
| Login           | All    | Scaffolded  |
| Dashboard       | TBD    | Planned     |
| Maintenance     | Nikhil | In progress |
| Reports         | Vikash | In progress |
| System Settings | Sweta  | In progress |

---

## Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- MongoDB (local instance or MongoDB Atlas URI)

### 1. Clone the repository

```bash
git clone https://github.com/<org>/hyperion.git
cd hyperion
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `/server`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Create a `.env` file inside `/client`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Run in development

```bash
# In one terminal — backend
cd server
npm run dev

# In another terminal — frontend
cd client
npm run dev
```

Frontend runs at `http://localhost:5173`, backend at `http://localhost:5000`.

---

## Design

Hyperion follows a card-based layout inspired by Lenovo Vantage's system monitoring interface. Each page renders informational cards in a tabular grid against a consistent background. Refer to `design_guidelines.md` for the full design system including color palette, spacing, typography, and TailwindCSS conventions.

---

## Contributing

Read `collaboration_guidelines.md` before making your first commit. Key rules:

- Branch off `dev`, never commit directly to `main` or `dev`.
- Use conventional commit messages (see collaboration guide).
- All pull requests require **at least one approving review** before merge.

---

## License

MIT
