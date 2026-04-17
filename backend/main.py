from fastapi import FastAPI

# Creamos la instancia de la aplicación
app = FastAPI(title="FrontAI - Backend")

@app.get("/")
def home():
    return {
        "mensaje": "Servidor de FrontAI activo",
        "usuario": "dalende",
        "estado": "listo para programar"
    }

@app.get("/test")
def test():
    return {"data": "Esta es una ruta de prueba"}l