# app.py
import os
import json
from datetime import datetime
from typing import List, Dict, Any

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING
from bson.objectid import ObjectId

import numpy as np
from sentence_transformers import SentenceTransformer

# ----------------------
# Configuration
# ----------------------
MONGODB_URI = os.environ.get("MONGODB_URI", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "internmatch")
EMBED_MODEL = os.environ.get("EMBED_MODEL", "all-MiniLM-L6-v2")
PORT = int(os.environ.get("PORT", 8000))

# Learning rate for online feedback updates (small)
FEEDBACK_LR = float(os.environ.get("FEEDBACK_LR", 0.12))

# ----------------------
# Initialize
# ----------------------
app = Flask(__name__)
CORS(app)

mongo = MongoClient(MONGODB_URI)
db = mongo[DB_NAME]
candidates_col = db["candidates"]
internships_col = db["internships"]
feedback_col = db["feedbacks"]
matches_col = db["match_logs"]

# Create some helpful indexes
candidates_col.create_index([("email", ASCENDING)], unique=False)
internships_col.create_index([("company", ASCENDING)])
internships_col.create_index([("skills", ASCENDING)])

# Load embedding model (loads on startup)
print("Loading embedding model:", EMBED_MODEL)
model = SentenceTransformer(EMBED_MODEL)
EMB_DIM = model.get_sentence_embedding_dimension()
print("Model embedding dim:", EMB_DIM)

# Simple predefined skill dictionary (expandable)
COMMON_SKILLS = {
    "python", "java", "c++", "c#", "javascript", "react", "node", "sql", "mongodb",
    "postgresql", "excel", "html", "css", "aws", "docker", "kubernetes", "git",
    "linux", "machine learning", "ml", "data analysis", "nlp", "pytorch", "tensorflow",
    "matlab", "r", "stata", "tableau", "spark", "hadoop", "communication", "leadership",
    "problem solving", "deep learning", "computer vision", "rest api"
}
# normalize skill set lower
COMMON_SKILLS = set(s.lower() for s in COMMON_SKILLS)

# ----------------------
# Helpers
# ----------------------
def now_iso():
    return datetime.utcnow().isoformat() + "Z"

def normalize_skill_list(skills: List[str]) -> List[str]:
    out = []
    for s in skills:
        if not s:
            continue
        s2 = s.strip().lower()
        if s2:
            out.append(s2)
    return sorted(list(set(out)))

def extract_skills_from_text(text: str) -> List[str]:
    """A simple keyword-based skill extractor. Expand or replace with an NLP model later."""
    if not text:
        return []
    txt = text.lower()
    found = set()
    for skill in COMMON_SKILLS:
        if skill in txt:
            found.add(skill)
    # also simple multiword detection: phrases separated by common punctuation
    return sorted(list(found))

def make_text_for_embedding(entity: Dict[str, Any], kind: str) -> str:
    """
    Build a single textual blob for embedding. 'kind' is "candidate" or "internship".
    """
    parts = []
    if kind == "candidate":
        parts.append(entity.get("name", ""))
        parts.append(entity.get("bio", ""))
        parts.extend(entity.get("skills", []))
        parts.append(entity.get("education", ""))
        parts.append(entity.get("interests", ""))
        parts.append(entity.get("resume_text", ""))
    else:
        parts.append(entity.get("title", ""))
        parts.append(entity.get("company", ""))
        parts.append(entity.get("description", ""))
        parts.extend(entity.get("skills", []))
        parts.append(entity.get("location", ""))
        parts.append(entity.get("duration", ""))
    blob = " | ".join([p for p in parts if p])
    return blob.strip()

def embed_text(text: str) -> List[float]:
    if not text:
        # zero vector guard (shouldn't happen)
        vec = np.zeros(EMB_DIM, dtype=float)
        return vec.tolist()
    vec = model.encode(text, convert_to_numpy=True)
    norm = np.linalg.norm(vec)
    if norm == 0:
        return vec.tolist()
    vec = vec / norm
    return vec.tolist()

def vector_dot(a: np.ndarray, b: np.ndarray) -> float:
    # expects normalized vectors => dot product == cosine
    return float(np.dot(a, b))

# ----------------------
# API Endpoints
# ----------------------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "time": now_iso(), "db": DB_NAME})

@app.route("/api/candidates", methods=["POST"])
def create_candidate():
    """
    POST JSON:
    {
      "name": "Alice",
      "email": "alice@example.com",
      "skills": ["python","ml"],           (optional)
      "bio": "2nd year comp sci ...",
      "education": "BSc Computer Science",
      "interests": "NLP, Search",
      "resume_text": "Full resume text (optional)"
    }
    """
    data = request.get_json(force=True)
    if not data or "name" not in data or "email" not in data:
        return jsonify({"error": "must provide name and email"}), 400

    skills = data.get("skills") or []
    if not skills:
        skills = extract_skills_from_text(" ".join([data.get("bio",""), data.get("resume_text",""), data.get("interests","")]))
    skills = normalize_skill_list(skills)

    entity = {
        "name": data.get("name"),
        "email": data.get("email"),
        "bio": data.get("bio", ""),
        "education": data.get("education", ""),
        "interests": data.get("interests", ""),
        "skills": skills,
        "resume_text": data.get("resume_text", ""),
        "created_at": now_iso()
    }

    text_blob = make_text_for_embedding(entity, kind="candidate")
    emb = embed_text(text_blob)
    entity["embedding"] = emb
    res = candidates_col.insert_one(entity)
    entity["_id"] = str(res.inserted_id)
    # hide raw embedding in list view? we return it for debug
    return jsonify({"candidate": entity}), 201

@app.route("/api/internships", methods=["POST"])
def create_internship():
    """
    POST JSON:
    {
      "title": "ML Intern",
      "company": "ACME",
      "description": "Build models ...",
      "skills": ["python", "ml"] (optional)
      "location": "Remote",
      "duration": "3 months"
    }
    """
    data = request.get_json(force=True)
    if not data or "title" not in data or "company" not in data:
        return jsonify({"error": "must provide title and company"}), 400

    skills = data.get("skills") or []
    if not skills:
        skills = extract_skills_from_text(" ".join([data.get("description","")]))
    skills = normalize_skill_list(skills)

    entity = {
        "title": data.get("title"),
        "company": data.get("company"),
        "description": data.get("description", ""),
        "skills": skills,
        "location": data.get("location", ""),
        "duration": data.get("duration", ""),
        "created_at": now_iso()
    }
    text_blob = make_text_for_embedding(entity, kind="internship")
    emb = embed_text(text_blob)
    entity["embedding"] = emb
    res = internships_col.insert_one(entity)
    entity["_id"] = str(res.inserted_id)
    return jsonify({"internship": entity}), 201

@app.route("/api/match/<candidate_id>", methods=["GET"])
def match_candidate(candidate_id):
    """
    GET params:
      top_k (default 10)
      min_score (float, default 0.0)
      location (optional) - filter internships by location substring
      skill_filter (optional, comma-separated) - require internships to include at least one of these skills
    """
    try:
        cand_obj = candidates_col.find_one({"_id": ObjectId(candidate_id)})
    except Exception:
        return jsonify({"error": "invalid candidate_id"}), 400
    if not cand_obj:
        return jsonify({"error": "candidate not found"}), 404

    top_k = int(request.args.get("top_k", 10))
    min_score = float(request.args.get("min_score", 0.0))
    location = request.args.get("location")
    skill_filter = request.args.get("skill_filter")

    query = {}
    if location:
        # simple substring match
        query["location"] = {"$regex": location, "$options": "i"}
    if skill_filter:
        skill_list = [s.strip().lower() for s in skill_filter.split(",") if s.strip()]
        if skill_list:
            query["skills"] = {"$in": skill_list}

    # fetch internships (embedding field required)
    docs = list(internships_col.find(query, {"embedding": 1, "title": 1, "company": 1, "description": 1, "skills": 1, "location": 1, "duration": 1}))
    if not docs:
        return jsonify({"matches": []})

    # Build numpy arrays
    emb_list = []
    id_map = []
    for d in docs:
        emb = d.get("embedding")
        if not emb:
            continue
        emb_list.append(np.array(emb, dtype=float))
        id_map.append(d["_id"])
    if len(emb_list) == 0:
        return jsonify({"matches": []})

    emb_matrix = np.vstack(emb_list)  # (n, dim)
    cand_emb = np.array(cand_obj["embedding"], dtype=float)

    # Ensure normalized (we normalize both sides on creation, but safe check):
    def safe_norm(a):
        n = np.linalg.norm(a)
        return a / n if n and n != 0 else a

    cand_emb = safe_norm(cand_emb)
    # compute cosine via dot product (both normalized)
    scores = emb_matrix.dot(cand_emb)  # (n,)

    # collect results with score and matched skills
    results = []
    for i, score in enumerate(scores):
        if score < min_score:
            continue
        doc_id = id_map[i]
        d = next((x for x in docs if x["_id"] == doc_id), None)
        if d is None:
            continue
        matched_skills = list(set(cand_obj.get("skills", [])) & set(d.get("skills", [])))
        results.append({
            "internship_id": str(doc_id),
            "title": d.get("title"),
            "company": d.get("company"),
            "location": d.get("location"),
            "duration": d.get("duration"),
            "score": float(score),
            "matched_skills": matched_skills,
            "description": (d.get("description")[:300] + "...") if d.get("description") else ""
        })

    # sort descending score
    results = sorted(results, key=lambda r: r["score"], reverse=True)[:top_k]

    # store a quick match log
    matches_col.insert_one({
        "candidate_id": candidate_id,
        "query_filters": {"location": location, "skill_filter": skill_filter},
        "result_count": len(results),
        "top": [r["internship_id"] for r in results],
        "ts": now_iso()
    })

    return jsonify({"matches": results})

@app.route("/api/feedback", methods=["POST"])
def feedback():
    """
    POST JSON:
    {
      "candidate_id": "<id>",
      "internship_id": "<id>",
      "feedback": "positive" | "negative" | "applied",
      "note": "optional"
    }

    If feedback == "positive", candidate embedding is nudged towards the internship embedding (simple online update).
    """
    data = request.get_json(force=True)
    for k in ("candidate_id", "internship_id", "feedback"):
        if k not in data:
            return jsonify({"error": f"missing {k}"}), 400
    candidate_id = data["candidate_id"]
    internship_id = data["internship_id"]
    fb = data["feedback"]

    # validate existence
    try:
        cand_obj = candidates_col.find_one({"_id": ObjectId(candidate_id)})
        intern_obj = internships_col.find_one({"_id": ObjectId(internship_id)})
    except Exception:
        return jsonify({"error": "invalid id(s)"}), 400
    if not cand_obj or not intern_obj:
        return jsonify({"error": "candidate or internship not found"}), 404

    fb_doc = {
        "candidate_id": candidate_id,
        "internship_id": internship_id,
        "feedback": fb,
        "note": data.get("note", ""),
        "ts": now_iso()
    }
    feedback_col.insert_one(fb_doc)

    # If positive feedback, nudge the candidate embedding toward internship embedding
    if fb.lower() == "positive":
        c_emb = np.array(cand_obj["embedding"], dtype=float)
        i_emb = np.array(intern_obj["embedding"], dtype=float)
        # small online update
        new_emb = c_emb + FEEDBACK_LR * i_emb
        norm = np.linalg.norm(new_emb)
        if norm == 0:
            # fallback
            new_emb = c_emb
        else:
            new_emb = new_emb / norm
        # write back
        candidates_col.update_one({"_id": cand_obj["_id"]}, {"$set": {"embedding": new_emb.tolist(), "updated_at": now_iso()}})
        fb_doc["applied_online_update"] = True

    return jsonify({"ok": True, "feedback": fb_doc})

@app.route("/api/recompute_embeddings", methods=["POST"])
def recompute_embeddings():
    """
    POST JSON:
    {
      "type": "candidates" | "internships" | "all"   (default all)
    }
    Recomputes embeddings from stored text fields (use after changing model or skill extraction).
    """
    data = request.get_json(force=True) or {}
    typ = data.get("type", "all")
    if typ not in ("candidates", "internships", "all"):
        return jsonify({"error": "type must be one of candidates|internships|all"}), 400

    stats = {"updated": 0, "checked": 0}
    if typ in ("candidates", "all"):
        cursor = candidates_col.find({})
        for c in cursor:
            stats["checked"] += 1
            text_blob = make_text_for_embedding(c, kind="candidate")
            emb = embed_text(text_blob)
            candidates_col.update_one({"_id": c["_id"]}, {"$set": {"embedding": emb, "updated_at": now_iso()}})
            stats["updated"] += 1

    if typ in ("internships", "all"):
        cursor = internships_col.find({})
        for it in cursor:
            stats["checked"] += 1
            text_blob = make_text_for_embedding(it, kind="internship")
            emb = embed_text(text_blob)
            internships_col.update_one({"_id": it["_id"]}, {"$set": {"embedding": emb, "updated_at": now_iso()}})
            stats["updated"] += 1

    return jsonify({"ok": True, "stats": stats})

# ----------------------
# Run
# ----------------------
if __name__ == "__main__":
    print(f"Starting Flask app on 0.0.0.0:{PORT}")
    app.run(host="0.0.0.0", port=PORT)
