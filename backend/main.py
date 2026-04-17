from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3  # <--- trae la DB

app = FastAPI(title="FrontAI - Gestión de Pastoreo")

# El "puente" para que React pueda entrar
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def conectar_db():
    conn = sqlite3.connect('campo.db')
    conn.row_factory = sqlite3.Row
    return conn



# 1. Ruta de Inicio
@app.get("/")
def home():
    return {"mensaje": "Bienvenido al sistema FrontAI Caranday"}

# 2. Ruta de Animales
@app.get("/animales")
def obtener_animales():
    conn = conectar_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM animales")
    filas = cursor.fetchall()
    conn.close()
    return [dict(f) for f in filas]

# 3. Ruta de Sectores
@app.get("/sectores")
def obtener_sectores():
    return {"mensaje": "Sectores: 2 sectores con Pasto Llorón en etapa de crecimiento."}

# 4. Energia
@app.get("/energy")
def obtener_energy():
    return {"mensaje": "Indicaciones para Electricidad, Agua y Pileta"}

# 5. Ruta de Sectores
@app.get("/AI_Prompts")
def obtener_aiprompts():
    return {"mensaje": "AI Prompts: Área de Integración con AI"}

# 6. Ruta de Otros
@app.get("/otros")
def obtener_otros():
    return {"mensaje": "área de varios"}