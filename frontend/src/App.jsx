import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className="App">
      <h1>FrontAI</h1>
      <div className="card">
        <p>Bienvenido, Diego. El Frontend ya está conectado.</p>
        <button onClick={() => alert('¡Funciona!')}>
          Probar interacción
        </button>
      </div>
      <p className="read-the-docs">
        Estado: Configurando conexión con el Backend...
      </p>
    </div>
  )
}

export default App