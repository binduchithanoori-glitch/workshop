# CampusPulse

## Frontend

The React + Vite frontend lives at the repository root and calls the deployed API at `https://workshop-hinr.onrender.com`.

```sh
npm install
npm run dev
```

The app supports event discovery, event details, registration, attendee lists, and a personal registrations view. There is no sign-in flow. To register or load personal registrations, enter an existing UUID from the database's `users.id` column. The ID is stored in the current browser's local storage.

The backend allows cross-origin requests from any origin. CORS is configured on all routes in `backend/app.py`.

## Backend

## Deploy on Render

1. Push this project to a Git repository and connect that repository in Render.
2. Choose **Blueprint** deployment so Render reads `render.yaml` from the repository root.
3. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the service's environment settings.
4. Deploy. The service exposes `GET /` as its health check and serves the API under `/api`.

The API code and Python dependency list are in `backend/`. Local credentials belong in `backend/.env`; Render credentials should be added through its environment settings.
# workshop
# workshop
# workshop
