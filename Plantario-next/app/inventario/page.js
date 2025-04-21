"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';
import "../styles/inventario.css"

const Plantario = () => {
  const router = useRouter();
  const imagenes = {
    logo: "../img/logoInventario.png",
    icono: "../img/hoja.png",
    configuracion: "../img/menu.png",
    notificacion: "../img/notificacion.png",
    menu: "../img/menuBurger.png",
  }

  // Lista de ejemplo de plantas
  const [plantas, setPlantas] = useState([
    { id: 1, nombre: "Nombre de la planta" },
    { id: 2, nombre: "Nombre de la planta" },
    { id: 3, nombre: "Nombre de la planta" },
    { id: 4, nombre: "Nombre de la planta" },
  ])

  return (
    <div className="plantario-container">
      <header className="plantario-header">
        <h1 className="plantario-title">PLANTARIO</h1>
        <div className="plantario-icons">
          <button className="icon-button" onClick={() => router.push('/riego')}>
            <img src={imagenes.notificacion || "/placeholder.svg"} alt="Notificaciones" className="icon" />
          </button>
          <button className="icon-button">
            <img src={imagenes.menu || "/placeholder.svg"} alt="Menú" className="icon" />
          </button>
        </div>
      </header>

      <main className="plantario-content">
        <div className="gestion-title">
          <img src={imagenes.logo || "/placeholder.svg"} alt="Logo" className="logo-small" />
          <h2>Gestionar Plantas</h2>
        </div>

        <button className="inventario-button">Inventario de Plantas</button>

        <div className="plantas-list">
          {plantas.map((planta) => (
            <div key={planta.id} className="planta-item">
              <div className="planta-info">
                <img src={imagenes.icono || "/placeholder.svg"} alt="Planta" className="planta-icon" />
                <span className="planta-nombre">{planta.nombre}</span>
              </div>
              <button className="config-button" onClick={() => router.push('/perfilPlanta')}>
                <img src={imagenes.configuracion || "/placeholder.svg"} alt="Configurar" className="config-icon" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Plantario
