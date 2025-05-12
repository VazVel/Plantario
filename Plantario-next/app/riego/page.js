"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';  // Importar Swal
import "../styles/riego.css";

const Riego = () => {
  const router = useRouter();

  const imagenes = {
    icono: "../img/plantal.png",
    planta: "../img/plantaRF.png",
    notificacion: "../img/notificacion.png",
    configuracion: "../img/menu2.png",
    cerrarsesion: "../img/menu.png",
  };

  const [plantas, setPlantas] = useState([]);
  const [activeTab, setActiveTab] = useState("riego");
  const [isLoading, setIsLoading] = useState(true); // Estado para cargar

  // Obtener las plantas que necesitan mantenimiento
  const obtenerPlantas = async () => {
    try {
      const response = await fetch("/api/obtenerPlantasNecesitanMantenimiento", {
        method: "POST",
      });
      const data = await response.json();

      if (response.ok) {
        setPlantas(data.plantas);
        setIsLoading(false); // Al cargar las plantas, cambiamos el estado
      } else {
        console.error("Error al obtener plantas:", data.error);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error al conectar con la API:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    obtenerPlantas();
  }, []);

  const filtrarPlantas = () => {
    if (activeTab === "riego") {
      return plantas.filter((p) => p.necesitariego);
    } else if (activeTab === "fertilizacion") {
      return plantas.filter((p) => p.necesitafertilizacion);
    } else if (activeTab === "podado") {
      return plantas.filter((p) => p.necesitapoda);
    }
    return [];
  };

  // Marcar tarea como completada
  const marcarComoListo = async (idPlanta) => {
    try {
      const response = await fetch("/api/actualizarMantenimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idPlanta, tipo: activeTab }), // "riego", "fertilizacion", "poda"
      });

      const data = await response.json();
      if (response.ok) {
        // Mostrar mensaje con SweetAlert
        Swal.fire({
          title: '¡Listo!',
          text: 'La tarea ha sido marcada como completada.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
        obtenerPlantas(); // Refresca la lista
      } else {
        console.error(data.error);
        // Mostrar mensaje de error con SweetAlert
        Swal.fire({
          title: 'Error',
          text: 'No se pudo completar la tarea, intenta de nuevo.',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      }
    } catch (error) {
      console.error("Error al marcar como listo:", error);
      // Mostrar mensaje de error con SweetAlert
      Swal.fire({
        title: 'Error',
        text: 'Ocurrió un error, intenta de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };

  return (
    <div className="plantario-container">
      <header className="plantario-header">
        <h1 className="plantario-title" onClick={() => router.push("/base")}>
          PLANTARIO
        </h1>
        <div className="plantario-icons">
          <button className="icon-button" onClick={() => router.push("/riego")}>
            <img src={imagenes.notificacion} alt="Notificaciones" className="icon" />
          </button>
          <button className="icon-button" onClick={() => router.push("/inicio")}>
            <img src={imagenes.cerrarsesion} alt="Menú" className="icon" />
          </button>
        </div>
      </header>

      <main className="plantario-content1">
        <div className="gestion-title">
          <img src={imagenes.icono} alt="Logo" className="logo-small" />
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
          <button
            className={`tabbutton ${activeTab === "podado" ? "active" : ""}`}
            onClick={() => setActiveTab("podado")}
          >
            Podado
          </button>
        </div>

        <br />

        {/* Si está cargando, mostrar el spinner y el texto */}
        {isLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Cargando plantas...</p>
          </div>
        ) : (
          <div className="plantas-list">
          {filtrarPlantas().length === 0 ? (
            <div className="no-plants-message">
              <p>¡Todas las plantas ya han sido cuidadas!</p>
            </div>
          ) : (
            filtrarPlantas().map((planta) => (
              <div key={planta.idplanta} className="planta-item">
                <div className="planta-info">
                  <img src={imagenes.planta} alt="Planta" className="planta-icon" />
                  <span className="planta-nombre">{planta.nombreplanta}</span>
                </div>
                <p className="pregunta">
                  {activeTab === "riego"
                    ? "¿Ya regaste la planta?"
                    : activeTab === "fertilizacion"
                    ? "Es hora de alimentar a tu planta, ¿ya la fertilizaste?"
                    : "Es hora de podar tu planta, ¿ya la podaste?"}
                </p>
                <button
                  className="boton3"
                  onClick={() => marcarComoListo(planta.idplanta)}
                >
                  Listo
                </button>
                <button
                className="config-button"
                onClick={() => {
                  localStorage.setItem("id_planta", planta.idplanta);  // Guardar ID invisible
                  router.push('/perfilPlanta');                          // Ir a perfil
                }}
              >
                <img
                  src={imagenes.configuracion || "/placeholder.svg"}
                  alt="Configurar"
                  className="config-icon"
                />
              </button>
              </div>
            ))
          )}
        </div>
        )}
      </main>
    </div>
  );
};

export default Riego;
