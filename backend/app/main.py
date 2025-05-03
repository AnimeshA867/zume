from fastapi import FastAPI, UploadFile, File
from models import MsgPayload, ResumeInfo, JobDescriptionAnalysis
import spacy
from pdfminer.high_level import extract_text

app = FastAPI()
messages_list: dict[int, MsgPayload] = {}

nlp = spacy.load("en_core_web_sm")

@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Hello"}


# About page route
@app.get("/about")
def about() -> dict[str, str]:
    return {"message": "This is the about page."}


# Route to add a message
@app.post("/messages/{msg_name}/")
def add_msg(msg_name: str) -> dict[str, MsgPayload]:
    # Generate an ID for the item based on the highest ID in the messages_list
    msg_id = max(messages_list.keys()) + 1 if messages_list else 0
    messages_list[msg_id] = MsgPayload(msg_id=msg_id, msg_name=msg_name)

    return {"message": messages_list[msg_id]}


# Route to list all messages
@app.get("/messages")
def message_items() -> dict[str, dict[int, MsgPayload]]:
    return {"messages:": messages_list}


@app.post("/extract_resume")
async def extract_resume(file: UploadFile = File(...)) -> ResumeInfo:
    text = extract_text(file.file)
    doc = nlp(text)

    name = None
    contact_info = None
    work_experience = []
    education = []

    for ent in doc.ents:
        if ent.label_ == "PERSON" and not name:
            name = ent.text
        elif ent.label_ in ["EMAIL", "PHONE"]:
            contact_info = ent.text
        elif ent.label_ == "ORG":
            work_experience.append(ent.text)
        elif ent.label_ == "EDUCATION":
            education.append(ent.text)

    return ResumeInfo(
        name=name,
        contact_info=contact_info,
        work_experience=work_experience,
        education=education
    )


@app.post("/analyze_job_description")
async def analyze_job_description(job_description: str) -> JobDescriptionAnalysis:
    doc = nlp(job_description)
    skills = [ent.text for ent in doc.ents if ent.label_ == "SKILL"]

    return JobDescriptionAnalysis(skills=skills)
