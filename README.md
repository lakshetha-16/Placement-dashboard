# PlaceTrack – Student Placement Dashboard

React 18 + Vite + React Router 6. No backend needed: jobs/stats are fetched from `public/data/*.json`; users, applications and notifications persist in `localStorage`.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```
Register an account first, then log in. Passwords are stored in plain text in localStorage for demo purposes only – a real app must hash them on a server.

## Deploy (live link)
Run `npm run build`, then drag the `dist/` folder onto Netlify Drop, or push to GitHub and import the repo in Vercel (build command `npm run build`, output `dist`). HashRouter means no rewrite rules are needed.

## Architecture
| Requirement | Where |
|---|---|
| Component-based design | `src/components`, `src/pages` |
| React Router | `src/App.jsx` (public routes, `Protected` wrapper, nested layout with `Outlet`) |
| Context API | `AuthContext` (session/profile), `DataContext` (jobs, applications, notifications) |
| Hooks | `useState`, `useEffect`, `useMemo`, custom `useForm` |
| API integration | `src/api/api.js` (fetch + mock persistence) |
| Form validation | `useForm` + validators in Login, Register, Profile |
| Responsive design | CSS grid and a media query in `styles.css` |

## Features
Login/registration/profile · searchable and filterable job list · apply · application tracking with status and interview date · dashboard (stats, placement trends, deadlines, interviews) · notifications (interview alerts, company updates, announcements).

## Documentation tasks for you
Add screenshots of each page under `docs/screens/` for the "UI Design Screens" deliverable, and record a short demo walking through register → apply → simulate stages → notifications.
