# LetsFly - Flight Booking Platform 🚀

## 🎯 Overview
LetsFly is a full‑stack flight search application that integrates with the Amadeus Flight Offers API. It provides airport autocomplete, date validation, flexible passenger controls, and clear error messages. Built with TypeScript end‑to‑end, the project separates concerns (services, hooks, components) for maintainability and testability.

**Tech stack:** React 18 + TypeScript, MUI 5, Node.js + Express, Amadeus Self‑Service API

---

## 📌 What's in this README
A concise guide to running and developing the app locally, API usage examples, troubleshooting tips, and the project roadmap. Use this file as the single reference for contributors and reviewers.

---

## 📁 Project Structure (high level)

```
LetsFly/
├── client/                 # Frontend ( React)
│   └── src/
│       ├── components/     # Reusable UI components (MUI)
│       ├── hooks/          # Custom React hooks
│       ├── services/       # API wrappers (axios)
│       ├── interfaces/     # TypeScript types and interfaces
│       └── utils/          # Helpers (date formatting, formatting)
└── server/                 # Backend (Express)
    └── src/
        ├── config/         # Environment & Amadeus configuration
        ├── interfaces/     # TypeScript interfaces & shared types
        ├── controllers/    # Route handlers
        ├── routes/         # Express route definitions
        ├── services/       # Business logic & Amadeus integration
        ├── middlewares/    # Error handling & validation
        └── mappers/        # Map Amadeus responses to UI-friendly payloads
```

## 🚀 Quick start (local)

Prerequisites:
- Node.js 18+ and npm 9+
- An Amadeus test account (client id & secret)

1) Clone & install
```bash
git clone <your-repo>
cd letsFly

# Install frontend and backend deps
cd client && npm install
cd server && npm install
```

2) Add environment variables

client/.env
```
REACT_APP_API_URL=http://localhost:5000/api
```

server/.env
```
AMADEUS_API_KEY=your_client_id
AMADEUS_API_SECRET=your_client_secret
PORT=5000
```

3) Run locally (PowerShell example)
- Terminal 1 (Backend):
```powershell
cd server
npm run dev    
```
- Terminal 2 (Frontend):
```powershell
cd client
npm run start  # runs UI app
```

Visit: http://localhost:3000

---

---

## ✨ What this app does (features)

- **Real-time Flight Search** — Query Amadeus Flight Offers and present compact, actionable offers to the user.
- **Airport Autocomplete** — Fast suggestions with debouncing to limit requests and reduce noise.
- **Date Validation** — Prevent selecting past dates and ensure return > departure for round trips.
- **Passenger Controls** — Add/remove adults/children/infants with sensible defaults and limits.
- **Filters** — Non-stop preference and travel‑class selector.
- **Clear Error Handling** — Surface relevant Amadeus errors cleanly in the UI (INVALID DATE, O/D overlap, QUOTA_EXCEEDED).
- **Responsive UI** — Mobile-first design with MUI, animations and accessible components.


---

## 📱 API: endpoints & examples

1) Airport autocomplete
- `GET /api/locations?q=<query>`

Example curl:
```bash
curl "http://localhost:5000/api/locations?q=del"
```

2) Flight search
- `POST /api/flights/search`

Request schema (TypeScript):
```ts
interface FlightSearchRequest {
  origin: string;
  destination: string;
  departureDate: string; // YYYY-MM-DD
  returnDate?: string;   // YYYY-MM-DD
  adults?: number;       // defaults to 1
  children?: number;
  infants?: number;
  nonStop?: boolean;
  travelClass?: 'ECONOMY'|'PREMIUM_ECONOMY'|'BUSINESS'|'FIRST';
}
```

Example request (curl):
```bash
curl -X POST http://localhost:5000/api/flights/search \
  -H "Content-Type: application/json" \
  -d '{
    "origin":"DEL",
    "destination":"MUC",
    "departureDate":"2026-01-15,
    "returnDate":"2026-01-20",
    "adults":1,
    "nonStop":false,
    "travelClass":"ECONOMY"
  }'
```
```

Notes:
- Use `YYYY-MM-DD` for dates. Return trips require both `departureDate` and `returnDate`.
- The backend relays Amadeus errors; the UI displays friendly guidance.


---

## 🛠 Development Scripts
**Client**
```bash
npm run start  # Run app (UI)
npm run dev    # Development server (optional)
npm run build  # Production build
```

**Server**
```bash
npm run dev    # Nodemon dev server
npm run build  # TypeScript build
npm start      # Run built server
```

---

## 🎨 UI/UX Highlights
- Backdrop blur on modals/loaders
- Smooth animations (Fade transitions)
- Mobile-first responsive design
- Dark theme ready (MUI theme)
- Loading states with airline icons
- Error popups with exact API messages

## 🔍 Error Handling
Common Amadeus errors passed to UI:
- `INVALID DATE`: Date/Time is in the past
- `INVALID DATA RECEIVED`: O/D overlap (origin = destination)
- `QUOTA_EXCEEDED`: Daily quota reached

---

## 📈 Production Deployment

**Client** (Vercel/Netlify)
```bash
npm run build
# Upload `dist/` or `build/` as required by platform
```

**Server** (Railway/Render/DigitalOcean)
```bash
npm run build
npm start
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|---|---|
| INVALID DATE | Select future departure dates |
| O/D overlap | Ensure origin ≠ destination |
| CORS error | Check `REACT_APP_API_URL` |
| Quota exceeded | Check Amadeus Test Dashboard |

---

## 📚 Tech Decisions
- Single catch-all route (*)
- Styles separated (`.styles.ts`)
- Custom hooks
- Full TypeScript Type safety 
- Amadeus Self-Service API
- MUI 5 System

---
## 🚧 Roadmap

- **Establish comprehensive test coverage** — Add unit and integration tests (Jest, React Testing Library). Integrate with CI to run tests and enforce quality gates.
- **Implement booking & payments** — Design an end-to-end booking flow with a payment gateway abstraction (PCI considerations, secure tokenization, test vs production modes).
- **Add user accounts & authentication** — Support signup/login, JWT or OAuth options, persistent profiles, and saved searches.
- **Improve pagination & scalability** — Implement server-side pagination, result aggregation, and caching to handle limitations in Amadeus responses and scale search results efficiently.
- **Optimize performance & observability** — Add response caching, request batching, structured logging, metrics, and error tracing (Prometheus/Grafana or similar).
- **Accessibility & internationalization** — Ensure WCAG compliance, keyboard navigation, ARIA roles, and add i18n/localization support.
- **Future features** — Multi-city searches, price alerts/notifications, saved itineraries, admin analytics dashboard, and CI-driven deployment pipelines.

---

## 🖼 Screenshots

Below are a few screenshots from the app demonstrating the main UI and states:

![Main screen](Screenshots/main-screen.png)
*Main screen — search form and overview.*

![Search results](Screenshots/search-results.png)
*Search results showing flight offers and prices.*

![Filters](Screenshots/filters.png)
*Filters panel with non-stop and travel class options.*

![Loading state](Screenshots/loading.png)
*Loading state shown while fetching results.*
