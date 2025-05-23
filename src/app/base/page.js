"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/base.css";
import Swal from 'sweetalert2';

// Rutas de las imágenes
const IMAGES = {
  mainIllustration: "../img/principal.png",
  calendarIcon: "../img/calendario.png",
  manageIcon: "../img/gestion.png",
  wateringIcon: "../img/regar.png",
  fertilizeIcon: "../img/fertilizar.png",
  principal: "../img/chicap.png",
};

const Plantario = () => {
  const router = useRouter();

  // Función para cerrar sesión
  const cerrarSesion = async () => {
    try {
      const response = await fetch("/api/cerrarsesion", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.mensaje);
        
        await Swal.fire({
          title: '¡Éxito!',
          text: 'Sesión cerrada correctamente.',
          icon: 'success',
          confirmButtonColor: '#4caf50',
          confirmButtonText: 'Aceptar'
        });

        router.push("/");
      } else {
        console.error(data.error);
        alert("No se pudo cerrar la sesión.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al cerrar sesión.");
    }
  };

  return (
    <div className="plantario-container">
      <header className="plantario-header">
        <link rel="icon" href="/img/logoinventario.png" />
        <h1 className="plantario-title" onClick={() => router.push("/base")}>PLANTARIO</h1>
        <div className="header-icons">
          <button className="icon-button notification" onClick={() => router.push("/riego")}>
            <img src="../img/notificacion.png" alt="Notificaciones" />
          </button>
          <button className="icon-button menu" onClick={cerrarSesion}>
            <img src="../img/menu.png" alt="Cerrar sesión" />
          </button>
        </div>
      </header>

      <main className="plantario-content">
        <div className="content-card">
          <div className="hero-section">
            <div className="hero-text">
              <h2 className="hero-title">Cuida tus plantas, como ellas cuidan de ti.</h2>
              <p className="hero-subtitle">Registra una nueva planta:</p>
              <button className="new-plant-button" onClick={() => router.push("/registroplanta")}>
                Nueva Planta
              </button>
            </div>
            <div className="hero-image">
              <img src={IMAGES.principal || "/placeholder.svg"} alt="Cuidado de plantas" />
            </div>
          </div>

          <h3 className="tools-title">Herramientas de cuidado</h3>

          <div className="tools-grid">
            <div className="tool-card" onClick={() => router.push("/riego")}>
              <img src={IMAGES.calendarIcon || "/placeholder.svg"} alt="Calendario" className="tool-icon" />
              <p className="tool-name">Calendario de Tareas</p>
            </div>
            <div className="tool-card" onClick={() => router.push("/inventario")}>
              <img src={IMAGES.manageIcon || "/placeholder.svg"} alt="Gestionar" className="tool-icon" />
              <p className="tool-name">Gestionar plantas</p>
            </div>
            <div className="tool-card" onClick={() => router.push("/riego")}>
              <img src={IMAGES.wateringIcon || "/placeholder.svg"} alt="Riego" className="tool-icon" />
              <p className="tool-name">Riego</p>
            </div>
            <div className="tool-card" onClick={() => router.push("/riego")}>
              <img src={IMAGES.fertilizeIcon || "/placeholder.svg"} alt="Fertilizado" className="tool-icon" />
              <p className="tool-name">Fertilizado</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Plantario;
