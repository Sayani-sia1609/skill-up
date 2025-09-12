import io
from typing import List
from PyPDF2 import PdfReader
import re

class ResumeTextTransformer:
    """
    Extracts and parses text from a PDF resume for further NLP processing.
    """
    def __init__(self, pdf_bytes: bytes):
        self.pdf_bytes = pdf_bytes
        self.text = self._extract_text()

    def _extract_text(self) -> str:
        reader = PdfReader(io.BytesIO(self.pdf_bytes))
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text

    def get_cleaned_text(self) -> str:
        # Remove extra whitespace, newlines, and non-printable characters
        cleaned = re.sub(r'\s+', ' ', self.text)
        cleaned = re.sub(r'[^\x20-\x7E]', '', cleaned)
        return cleaned.strip()

    def get_sections(self) -> dict:
        # Example: Extract sections like Education, Experience, Skills
        sections = {}
        patterns = {
            'education': r'(education|academic background|qualifications)[\s\S]*?(?=(experience|skills|projects|$))',
            'experience': r'(experience|work history|employment)[\s\S]*?(?=(education|skills|projects|$))',
            'skills': r'(skills|technical skills|competencies)[\s\S]*?(?=(education|experience|projects|$))',
        }
        text_lower = self.text.lower()
        for key, pattern in patterns.items():
            match = re.search(pattern, text_lower)
            if match:
                sections[key] = match.group(0)
        return sections

# Example usage:
# with open('resume.pdf', 'rb') as f:
#     transformer = ResumeTextTransformer(f.read())
#     print(transformer.get_cleaned_text())
#     print(transformer.get_sections())
