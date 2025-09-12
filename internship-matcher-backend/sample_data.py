# sample_data.py
import requests
import time
BASE = "http://localhost:8081/api"

candidates = [
    {
        "name": "Alice Parker",
        "email": "alice@example.com",
        "bio": "Third-year Computer Science student passionate about NLP and ML.",
        "education": "BSc Computer Science",
        "interests": "NLP, language models, search",
        "skills": ["python", "nlp", "machine learning", "git"],
        "resume_text": "Built projects around text classification and retrieval."
    },
    {
        "name": "Bob Lee",
        "email": "bob@example.com",
        "bio": "Data analyst experienced with SQL and Tableau",
        "skills": ["sql", "excel", "tableau"]
    }
]

internships = [
    {
        "title": "NLP Research Intern",
        "company": "SearchCorp",
        "description": "Work on text embeddings, retrieval and ranking systems.",
        "skills": ["python", "nlp", "machine learning"],
        "location": "Remote",
        "duration": "3 months"
    },
    {
        "title": "Data Analytics Intern",
        "company": "RetailCo",
        "description": "Build dashboards and analyze sales using SQL and Tableau.",
        "skills": ["sql", "tableau", "excel"],
        "location": "NYC",
        "duration": "3 months"
    }
]

def post(path, payload):
    r = requests.post(BASE + path, json=payload)
    print(path, r.status_code, r.json())
    time.sleep(0.5)

if __name__ == "__main__":
    for c in candidates:
        post("/candidates", c)
    for i in internships:
        post("/internships", i)
