import React from 'react';

function VistaTabla({ titulo, datos }) {
  // Si no hay datos, mostramos un aviso amigable
  if (!datos || datos.length === 0) {
    return (
      <div className="info-box">
        <p>No se encontraron registros para mostrar.</p>
      </div>
    );
  }

  // Obtenemos los nombres de las columnas dinámicamente
  const columnas = Object.keys(datos[0]);

  return (
    <div className="hoja-tabla">
      <header className="header-tabla">
        <h1>{titulo}</h1>
        <span className="badge">{datos.length} Registros</span>
      </header>
      
      <div className="table-wrapper">
        <table className="tabla-campo">
          <thead>
            <tr>
              {columnas.map((col) => (
                <th key={col}>{col.toUpperCase().replace('_', ' ')}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((fila, i) => (
              <tr key={i}>
                {columnas.map((col) => (
                  <td key={col} className={col === 'id' ? 'id-resaltado' : ''}>
                    {col === 'tipo' ? (
                      <span className="tag-tipo">{fila[col]}</span>
                    ) : (
                      fila[col] || '-'
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VistaTabla;