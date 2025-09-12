from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from nlp import ResumeTextTransformer

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/parse-resume")
async def parse_resume(resume: UploadFile = File(...)):
    pdf_bytes = await resume.read()
    transformer = ResumeTextTransformer(pdf_bytes)
    return {
        "text": transformer.get_cleaned_text(),
        "sections": transformer.get_sections()
    }
