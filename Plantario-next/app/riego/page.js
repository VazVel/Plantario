"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import "../styles/riego.css";

const Riego = () => {
  const router = useRouter();

  const imagenes = {
    icono: "../img/plantal.png",
    planta: "../img/plantaRF.png",
    notificacion: "../img/notificacion.png",
    configuracion: "../img/menu.png",
  };

  const [plantas, setPlantas] = useState([
    { id: 1, nombre: "Nombre de la planta" },
    { id: 2, nombre: "Nombre de la planta" },
    { id: 3, nombre: "Nombre de la planta" },
    { id: 4, nombre: "Nombre de la planta" },
  ]);

  const [activeTab, setActiveTab] = useState("riego");

  return (
    <div className='plantario-container'>
      <header className='plantario-header'>
        <h1 className='plantario-title' onClick={() => router.push('/base')}>PLANTARIO</h1>
        <div className='plantario-icons'>
          <button className='icon-button' onClick={() => router.push('/riego')}>
            <img src={imagenes.notificacion} alt='Notificaciones' className='icon' />
          </button>
          <button className="icon-button" onClick={() => router.push('/base')}>
            <img src={imagenes.configuracion} alt="Menú" className="icon" />
          </button>
        </div>
      </header>

      <main className='plantario-content'>
        <div className='gestion-title'>
          <img src={imagenes.icono} alt='Logo' className='logo-small' />
          <h2>Calendario de Tareas</h2>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tabbutton ${activeTab === "riego" ? "active" : ""}`}
            onClick={() => setActiveTab("riego")}
          >
            Riego
          </button>
          <button
            className={`tabbutton ${activeTab === "fertilizacion" ? "active" : ""}`}
            onClick={() => setActiveTab("fertilizacion")}
          >
            Fertilización
          </button>
        </div>

       <br></br> 

        {/* Lista de plantas con contenido por tab */}
        <div className='plantas-list'>
          {plantas.map((planta) => (
            <div key={planta.id} className='planta-item'>
              <div className='planta-info'>
                <img src={imagenes.planta} alt='Planta' className='planta-icon' />
                <span className='planta-nombre'>{planta.nombre}</span>
              </div>
              <p className="pregunta">
                {activeTab === "riego"
                  ? "¿Ya regaste la planta?"
                  : "Es hora de alimentar a tu planta, ¿ya la fertilizaste?"}
              </p>
              <button className="boton3">Listo</button>
              <button className="config-button" onClick={() => router.push('/perfilPlanta')}>
                <img src={imagenes.configuracion} alt="Configurar" className="config-icon" />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Riego;
