"use client";
import { useState, useEffect } from "react";
import "../styles/riego.css"; // Puedes importar ambos estilos si son distintos
import "../styles/fertilizacion.css";

const PlantarioTabs = () => {
  const [fechaActual, setFechaActual] = useState("");
  const [activeTab, setActiveTab] = useState("riego");

  useEffect(() => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const año = hoy.getFullYear();
    const fechaFormateada = `${dia}/${mes}/${año}.`;
    setFechaActual(fechaFormateada);
  }, []);

  return (
    <div className="Fondo">
      <h1></h1>
      <h3>PLANTARIO</h3>

      <div className="container">
        <div className="Complicated">
          <div className="imagenRiego"></div>
          <h2>Calendario de Tareas</h2>

          <p className="fecha">{fechaActual}</p>

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

          {/* Contenido de la pestaña seleccionada */}
          {activeTab === "riego" && (
            <div className="cuadro">
              <div className="Cubo">
                <div className="planta"></div>
                <p className="nombreplanta">Nombre de la planta</p>
                <p className="pregunta">¿Ya regaste la planta?</p>
                <button className="boton3">Listo</button>
              </div>
            </div>
          )}

          {activeTab === "fertilizacion" && (
            <div className="cuadro">
              <div className="Cubo">
                <div className="planta"></div>
                <p className="nombreplanta">Nombre de la planta</p>
                <p className="pregunta">
                  Es hora de alimentar a tu planta, <br /> ¿ya la fertilizaste?
                </p>
                <button className="boton3">Listo</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlantarioTabs;
