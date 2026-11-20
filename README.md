# Events API

## Deploy on Render

1. Push this project to a Git repository and connect that repository in Render.
2. Choose **Blueprint** deployment so Render reads `render.yaml` from the repository root.
3. Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in the service's environment settings.
4. Deploy. The service exposes `GET /` as its health check and serves the API under `/api`.

The API code and Python dependency list are in `backend/`. Local credentials belong in `backend/.env`; Render credentials should be added through its environment settings.
# workshop
# workshop
# workshop
