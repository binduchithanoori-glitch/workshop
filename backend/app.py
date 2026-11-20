"""Public event and registration API backed by Supabase."""
import os

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import Client, create_client

load_dotenv()

app = Flask(__name__)
# Intentionally public: browser clients from any origin can call every route.
CORS(app, resources={r"/*": {"origins": "*"}})

supabase_url = os.environ.get("SUPABASE_URL")
supabase_key = os.environ.get("SUPABASE_PUBLISHABLE_KEY")
if not supabase_url or not supabase_key:
    raise RuntimeError("SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY must be configured")
supabase: Client = create_client(supabase_url, supabase_key)


def db_error(error):
    return jsonify({"error": str(error)}), 500


@app.get("/")
def index():
    return jsonify({"service": "events-api"})


@app.get("/api/events")
def list_events():
    try:
        return jsonify(supabase.table("events").select("*").execute().data)
    except Exception as error:
        return db_error(error)


@app.get("/api/events/<event_id>")
def get_event(event_id):
    try:
        rows = supabase.table("events").select("*").eq("id", event_id).limit(1).execute().data
        if not rows:
            return jsonify({"error": "Event not found"}), 404
        return jsonify(rows[0])
    except Exception as error:
        return db_error(error)


@app.post("/api/registrations")
def create_registration():
    payload = request.get_json(silent=True) or {}
    user_id, event_id = payload.get("user_id"), payload.get("event_id")
    if not user_id or not event_id:
        return jsonify({"error": "user_id and event_id are required"}), 400
    try:
        event_rows = supabase.table("events").select("id,capacity").eq("id", event_id).limit(1).execute().data
        if not event_rows:
            return jsonify({"error": "Event not found"}), 404
        existing = (supabase.table("registrations").select("id")
                    .eq("user_id", user_id).eq("event_id", event_id).limit(1).execute().data)
        if existing:
            return jsonify({"error": "Already registered"}), 409
        regs = supabase.table("registrations").select("id").eq("event_id", event_id).execute().data
        capacity = event_rows[0].get("capacity")
        if capacity is not None and len(regs) >= capacity:
            return jsonify({"error": "Event is full"}), 409
        inserted = (supabase.table("registrations")
                    .insert({"user_id": user_id, "event_id": event_id}).execute().data)
        return jsonify(inserted[0] if inserted else {}), 201
    except Exception as error:
        return db_error(error)


@app.get("/api/me/registrations")
def my_registrations():
    # With authentication intentionally disabled, callers provide user_id directly.
    user_id = request.args.get("user_id")
    if not user_id:
        return jsonify({"error": "user_id query parameter is required"}), 400
    try:
        rows = (supabase.table("registrations").select("*, events(*)")
                .eq("user_id", user_id).execute().data)
        return jsonify(rows)
    except Exception as error:
        return db_error(error)


@app.get("/api/events/<event_id>/registrations")
def event_registrations(event_id):
    # Public because no authenticated organizer identity is available.
    try:
        rows = supabase.table("registrations").select("*, users(id,email,role)").eq("event_id", event_id).execute().data
        return jsonify(rows)
    except Exception as error:
        return db_error(error)


if __name__ == "__main__":
    app.run(debug=False)
