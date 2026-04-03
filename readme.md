### Motivation

- Move the repository from scattered single-file views to a modular, production-ready frontend scaffold that matches the 2026 tech/design mandate (React 19, Tailwind, Framer Motion, Mapbox, Zustand, TanStack Query, Socket.IO, Wagmi, Sentry, Vercel analytics, etc.).
- Provide a premium, hyper‑futuristic UI foundation (glassmorphism, neon palette, motion/3D-ready components) and predictable data plumbing for Admin, Fleet, Analytics and Citizen experiences.
- Seed the app with Gurugram-centric dummy data, LSTM/GA route examples and PWA/SEO metadata so downstream frontend and backend integration can be validated quickly.

### Description

- Reorganized project into `public/` + `src/` with `src/{api,components,context,pages,utils}` and added a modern entrypoint `src/index.js` and `src/App.js` with `React.lazy` + `Suspense` and `QueryClientProvider` scaffolding.
- Implemented reusable UI primitives and pages including `GlassCard`, `Button`, `StatCard`, `SystemStatus`, `LiveMap` + `RouteLayer`, `QrScanner`, `Wallet`, and role pages `AdminDashboard`, `FleetManager`, `Analytics`, `UserApp` with Framer Motion micro‑interactions and Recharts/Tremor-ready charts.
- Added state & realtime plumbing via Zustand stores (`src/context/MapContext.js`, `src/context/DataContext.js`), API/socket client in `src/api/client.js`, and constants/dummy datasets in `src/utils/constants.js` plus helper utilities in `src/utils/helpers.js`.
- Upgraded and expanded `package.json` dependencies to reflect the requested stack, added `tailwind.config.js` (neon/nexus theme + animations), `postcss.config.js`, PWA `public/manifest.json`, and `public/index.html` metadata and assets.

### Testing

- Attempted `npm install` in this environment but the install failed due to npm registry access returning `403 Forbidden`, so dependencies could not be installed (failed).
- Attempted `npm run build` but it failed because required packages (e.g., `react-scripts`) were not installed in this environment (failed).
- Attempted a browser screenshot via Playwright against `http://localhost:3000` but the app server was not available because dependencies/install were not completed (failed).

------
[Codex Task](https://chatgpt.com/codex/tasks/task_e_69a1c57adfa0832a902f2d0109401ba6)
