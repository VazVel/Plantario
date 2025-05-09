"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import "../styles/inventario.css"

const Plantario = () => {
  const router = useRouter();
  const [plantas, setPlantas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const cerrarSesion = async () => {
    try {
      const response = await fetch("/api/cerrarsesion", {
        method: "POST",
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.mensaje);
        router.push("/inicio");
      } else {
        console.error(data.error);
        alert("No se pudo cerrar la sesión.");
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Ocurrió un error al cerrar sesión.");
    }
  };

  const imagenes = {
    logo: "/img/logoInventario.png",
    icono: "/img/hoja.png",
    configuracion: "/img/menu2.png",
    notificacion: "/img/notificacion.png",
    menu: "/img/menuBurger.png",
    cerrarsesion: "/img/menu.png",
  }

  useEffect(() => {
    const obtenerPlantas = async () => {
      try {
        const response = await fetch(`/api/inventario`);
        const data = await response.json();

        if (response.ok) {
          setPlantas(data.plantas);
        } else {
          setError(data.error || "Error al obtener las plantas.");
        }
      } catch (error) {
        setError("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    obtenerPlantas();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando tus plantas...</p>
      </div>
    );
  }

  return (
    <div className="plantario-container">
      <header className="plantario-header">
        <link rel="icon" href="/img/logoinventario.png" />
        <h1 className="plantario-title" onClick={() => router.push('/base')}>PLANTARIO</h1>
        <div className="plantario-icons">
          <button className="icon-button" onClick={() => router.push('/riego')}>
            <img src={imagenes.notificacion || "/placeholder.svg"} alt="Notificaciones" className="icon" />
          </button>
          <button className="icon-button" onClick={cerrarSesion}>
            <img src={imagenes.cerrarsesion || "/placeholder.svg"} alt="Menú" className="icon" />
          </button>
        </div>
      </header>

      <main className="plantario-content1">
        <div className="gestion-title">
          <img src={imagenes.logo || "/placeholder.svg"} alt="Logo" className="logo-small" />
          <h2>Gestionar Plantas</h2>
        </div>

        <button className="inventario-button">Inventario de Plantas</button>

        <div className="plantas-list">
          {error && <p className="error-message">{error}</p>}
          {Array.isArray(plantas) && plantas.map((planta) => (
            <div key={planta.id_planta} className="planta-item">
              <div className="planta-info">
                <img src={imagenes.icono || "/placeholder.svg"} alt="Planta" className="planta-icon" />
                <span className="planta-nombre">{planta.nombre_planta}</span>
              </div>
              <button
                className="config-button"
                onClick={() => {
                  localStorage.setItem("id_planta", planta.id_planta);  // Guardar ID invisible
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
          ))}
        </div>
      </main>
    </div>
  );
}

export default Plantario;
