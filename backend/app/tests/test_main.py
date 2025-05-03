import pytest
from fastapi.testclient import TestClient
from main import app


@pytest.fixture
def client():
    with TestClient(app) as client:
        yield client


def test_home_route(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello"}


def test_about_route(client):
    response = client.get("/about")
    assert response.status_code == 200
    assert response.json() == {"message": "This is the about page."}


def test_extract_resume(client):
    with open("tests/sample_resume.pdf", "rb") as file:
        response = client.post("/extract_resume", files={"file": file})
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "contact_info" in data
    assert "work_experience" in data
    assert "education" in data


def test_analyze_job_description(client):
    job_description = "We are looking for a software engineer with experience in Python, FastAPI, and Docker."
    response = client.post("/analyze_job_description", json={"job_description": job_description})
    assert response.status_code == 200
    data = response.json()
    assert "skills" in data
    assert "Python" in data["skills"]
    assert "FastAPI" in data["skills"]
    assert "Docker" in data["skills"]
