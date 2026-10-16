# Whiskey & Wheat

A React + Vite restaurant app: browse the flip-book menu, customise dishes, order online, reserve a table, and track orders and reservations. Admins can manage reservations. The app talks to a hosted REST API and supports a light and a dark theme.

## Features

- Flip-book menu with cached data, so repeat visits are instant
- Cart, customisations and checkout
- Table reservations with status tracking and cancellation
- Order history with cancellation
- Admin page to confirm, reject or complete reservations
- JWT login and registration with automatic token refresh
- Light and dark theme toggle, saved in the browser
- Toast notifications for every action, success or error
- Responsive layout for phones, tablets and desktops

## Playful touches

- **Delight on actions:** a dish flies into the cart when added, the cart bounces, confetti celebrates orders and reservations, and the logo hides a secret (click it five times).
- **Menu:** filter chips (Veg, Quick bites, Under ₹300, Favourites), category jump chips, a "Surprise me" slot-machine pick, dish detail pop-ups, favourites saved in the browser, and an optional page-flip sound (off by default).
- **Reservations:** tappable time slots, a guest stepper, and a ticket-style confirmation.
- **Orders:** a status timeline with friendly messages and a stamp card that fills as orders and reservations are completed.
- **Look and feel:** paper-grain texture, washi tape, polaroid-style gallery tiles that tilt, hand-drawn underlines, stamps, a scrolling marquee, a gold scroll-progress bar, a soft cursor glow on desktop, and a whiskey-glass loader.
- **Theme toggle:** the sun and moon morph, and the page changes with a circular reveal where supported.
- **Mobile:** a bottom navigation bar, swipe-to-close cart drawer, and a short vibration when adding to the cart.
- **Accessibility:** animations switch off for visitors who prefer reduced motion.

## Requirements

| Software | Version |
| --- | --- |
| Node.js | 20.19 or newer (22 LTS recommended) |
| npm | 10 or newer (installed with Node.js) |
| Git | Optional, only needed to clone the project |
| Browser | Any current Chrome, Edge, Firefox or Safari |

Check your versions:

```bash
node -v
npm -v
```

Download Node.js from https://nodejs.org if you don't have it.

## Setup

1. Open a terminal in the project folder (the one that contains `package.json`).

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create your environment file:

   ```bash
   # macOS / Linux / Git Bash
   cp .env.example .env

   # Windows Command Prompt
   copy .env.example .env

   # Windows PowerShell
   Copy-Item .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open http://localhost:5173 in your browser.

## Environment variables

Vite only exposes variables that start with `VITE_`. After changing `.env`, stop the server and run `npm run dev` again.

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_BASE_URL` | No | Base URL of the backend API, without a trailing slash. Defaults to `https://restaurant-3-uwi4.onrender.com`. |

Example `.env`:

```
VITE_API_BASE_URL=https://restaurant-3-uwi4.onrender.com
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server on port 5173 |
| `npm run build` | Creates a production build in `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run lint` | Runs ESLint |

## Pages

| Path | Access | Purpose |
| --- | --- | --- |
| `/` | Public | Home |
| `/menu` | Public | Flip-book menu |
| `/book-table` | Public to view, login to reserve | Reserve a table |
| `/gallery`, `/about` | Public | Gallery and story |
| `/login`, `/register` | Guests only | Authentication |
| `/checkout` | Logged in | Place an order |
| `/my-orders` | Logged in | Orders and reservations |
| `/profile` | Logged in | Profile and password |
| `/admin/reservations` | Admin only | Manage reservations |

## API endpoints used

| Area | Endpoints |
| --- | --- |
| Account | `POST /api/account/Register`, `POST /api/account/Login`, `POST /api/account/token/refresh/`, `GET and PUT /api/account/profile`, `POST /api/account/change-password/`, `GET /api/account/Admin` |
| Menu | `GET /api/menu/`, `GET /api/menu/{id}/customizations/` |
| Orders | `POST /api/create-order/`, `GET /api/my-orders/`, `POST /api/{id}/cancel/` |
| Reservations | `POST /api/reservations/`, `GET /api/reservations/my/`, `PATCH /api/reservations/{id}/cancel/` |
| Admin | `GET /api/admin/reservations/`, `PATCH /api/admin/reservations/{id}/status/` |

## Theme

The toggle sits in the top bar on every page, including login, register and the 404 page. The choice is stored in `localStorage` under the key `theme`. If nothing is stored, the app follows your system setting. Colours are defined once as CSS variables in `src/styles/theme.css`.

## Project structure

```
src/
  assets/        Images and the hero video (compressed to 720p)
  components/    Layout, home sections, menu modals, feedback views, fun (playful UI pieces)
  context/       Auth, cart and theme providers
  hooks/         useAuth, useCart, useMenu, useRequireAuth, useTheme
  layouts/       MainLayout and AuthLayout
  pages/         One file per route
  routes/        Route table and guards
  services/      API client and one service per area
  styles/        Tailwind entry and theme tokens
  utils/         Shared formatting helpers
```

## Troubleshooting

- **The first load is slow.** The free hosting for the API sleeps when idle and can take up to a minute to wake. The menu shows a loading message and then caches the result.
- **`npm install` fails with a Node error.** Upgrade Node.js to 20.19 or newer.
- **Port 5173 is already in use.** Stop the other process or run `npx vite --port 5174`.
- **Changes to `.env` have no effect.** Restart `npm run dev`.
- **You are logged out unexpectedly.** The session expired. Log in again.
- **Admin page redirects you home.** Your account needs the `ADMIN` role on the backend.
