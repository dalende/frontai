import { useState } from 'react'
import axios from 'axios'
import './App.css'
import VistaTabla from './VistaTabla'

function App() {
  const [mensaje, setMensaje] = useState("Panel de Control Activo")
  const [listaDatos, setListaDatos] = useState([])
  const [vista, setVista] = useState('inicio')
  const [tituloHoja, setTituloHoja] = useState('')
  const [menuAbierto, setMenuAbierto] = useState(true) // Nuevo estado para el menú

  const API_URL = "http://127.0.0.1:8000"; 

  const consultarBackend = async (ruta, titulo) => {
    try {
      const respuesta = await axios.get(`${API_URL}/${ruta}`);
      if (Array.isArray(respuesta.data)) {
        setListaDatos(respuesta.data);
        setTituloHoja(titulo);
        setVista('tabla');
      } else {
        setMensaje(respuesta.data.mensaje || "Información recibida");
        setVista('texto');
      }
      // Opcional: cierra el menú automáticamente al elegir una opción en celulares
      if (window.innerWidth < 768) setMenuAbierto(false);
    } catch (error) {
      console.error("Error:", error);
      setMensaje("Error de conexión con el servidor local.");
      setVista('texto');
    }
  };

  return (
    <div className={`layout ${!menuAbierto ? 'sidebar-oculta' : ''}`}>
      
      {/* BOTÓN PARA ABRIR/CERRAR (Flotante cuando está cerrado) */}
      <button 
        className="menu-toggle" 
        onClick={() => setMenuAbierto(!menuAbierto)}
        title={menuAbierto ? "Cerrar menú" : "Abrir menú"}
      >
        {menuAbierto ? '✕' : '☰'}
      </button>

      {/* MENÚ LATERAL */}
      <aside className={`sidebar ${!menuAbierto ? 'collapsed' : ''}`}>
        <div className="logo">Front<span>AI</span></div>
        <nav className="menu">
          <button onClick={() => { setVista('inicio'); setMensaje("Panel de Control Activo"); }}>🏠 Inicio</button>
          <button onClick={() => consultarBackend('animales', 'Planilla de Hacienda')}>🐄 Animales</button>
          <button onClick={() => consultarBackend('sectores', 'Estado de Sectores')}>🌱 Sectores</button>
          <button onClick={() => consultarBackend('energy', 'Monitoreo Energético')}>⚡ Energía</button>
          <button onClick={() => consultarBackend('AI_Prompts', 'Asistente Inteligente')}>🤖 AI Prompts</button>
          <button onClick={() => consultarBackend('otros', 'Otros Registros')}>⚙️ Otros</button>
        </nav>
        <div className="sidebar-footer">Ruta 28 • Taninga</div>
      </aside>

      {/* ÁREA DE CONTENIDO (Se expande si el menú se cierra) */}
      <main className="main-content">
        
        {vista === 'inicio' && (
          <div className="info-box">
            <h1>Bienvenido, MyD</h1>
            <p>Seleccione una opción del menú para gestionar los datos del campo.</p>
          </div>
        )}

        {vista === 'tabla' && (
          <VistaTabla titulo={tituloHoja} datos={listaDatos} />
        )}

        {vista === 'texto' && (
          <div className="info-box">
            <div className="status-card">
               <p>{mensaje}</p>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default App