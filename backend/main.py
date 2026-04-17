from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="FrontAI - Backend")

# Esto permite que el Frontend se comunique con el Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción pondremos la URL real
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"mensaje": "¡Hola desde el Backend de FrontAI!"}