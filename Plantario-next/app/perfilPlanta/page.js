"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import "../styles/perfilPlanta.css";

const PerfilPlanta = () => {
  const router = useRouter();
  const imagenes = {
    logo: "../img/plantalogo.png",
    notificacion: "../img/notificacion.png",
    menu: "../img/menu.png",
    hoja: "../img/hoja.png",
    eliminar: "../img/basuraIcon.png",
  };

  const [datosPlanta, setDatosPlanta] = useState({
    nombre: "",
    diasRegado: "",
    diasPodado: "",
    compostaRegado: "",
    descripcion: "",
  });

  const [idPlanta, setIdPlanta] = useState(null);
  const [cargando, setCargando] = useState(true);  // Estado para manejar el cargado

  useEffect(() => {
    const storedIdPlanta = localStorage.getItem("id_planta");
    if (storedIdPlanta) {
      setIdPlanta(storedIdPlanta);
      obtenerDatosPlanta(storedIdPlanta);
    }
  }, []);

  const obtenerDatosPlanta = async (id) => {
    setCargando(true);  // Iniciar el estado de carga

    try {
      const response = await fetch(`/api/perfilPlanta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_planta: id }),
      });
      const data = await response.json();
      if (response.ok) {
        setDatosPlanta({
          nombre: data.nombrePlanta || "",
          diasRegado: data.regadoDias || "",
          diasPodado: data.podadoDias || "",
          compostaRegado: data.fertilizadoDias || "",
          descripcion: "",  // Si no habilitas la descripción, déjala vacía
        });
        setCargando(false);  // Finalizamos el estado de carga
      } else {
        console.error(data.error || "Error al obtener los datos de la planta");
        setCargando(false);
      }
    } catch (error) {
      console.error("Error al obtener los datos de la planta:", error);
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPlanta({
      ...datosPlanta,
      [name]: value,
    });
  };

  const handleActualizar = async (e) => {
    e.preventDefault();

    // Si no tienes el ID de la planta, mostramos un error
    if (!idPlanta) {
      console.error("No se pudo obtener el ID de la planta.");
      return;
    }

    // Preparamos los datos a enviar
    const datosActualizados = {
      id_planta: idPlanta, // Usamos el ID de la planta
      nombre: datosPlanta.nombre,
      regadoDias: datosPlanta.diasRegado,
      podadoDias: datosPlanta.diasPodado,
      fertilizadoDias: datosPlanta.compostaRegado,
    };

    try {
      const response = await fetch(`/api/perfilPlanta`, {
        method: "PUT", // Usamos el método PUT para actualizar
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosActualizados),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Datos de la planta actualizados con éxito");
        // **Actualizamos los datos de la planta en el frontend**
        setDatosPlanta({
          nombre: data.nombrePlanta,
          diasRegado: data.regadoDias,
          diasPodado: data.podadoDias,
          compostaRegado: data.fertilizadoDias,
          descripcion: "", // Si habilitas la descripción, también la actualizas aquí.
        });
        alert("Datos actualizados con éxito");
      } else {
        console.error(data.error || "Error al actualizar los datos de la planta");
      }
    } catch (error) {
      console.error("Error al actualizar los datos de la planta:", error);
    }
  };

  const handleEliminar = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta planta?")) {
      try {
        const response = await fetch(`/api/eliminarplanta`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_planta: idPlanta }), // Enviar el id de la planta
        });

        const data = await response.json();
        if (response.ok) {
          alert(data.message); // Mensaje de éxito
          router.push("/inventario"); // Redirigir al inicio o donde desees
        } else {
          alert(data.error || "Error al eliminar la planta");
        }
      } catch (error) {
        console.error("Error al eliminar la planta:", error);
        alert("Hubo un problema al eliminar la planta.");
      }
    }
  };

  return (
    <div className="plantario-container">
      <header className="plantario-header">
        <h1 className="plantario-title" onClick={() => router.push('/base')}>PLANTARIO</h1>
        <div className="plantario-icons">
          <button className="icon-button" onClick={() => router.push('/riego')}>
            <img src={imagenes.notificacion || "/placeholder.svg"} alt="Notificaciones" className="icon" />
          </button>
          <button className="icon-button" onClick={() => router.push('/inicio')}>
            <img src={imagenes.menu || "/placeholder.svg"} alt="Menú" className="icon" />
          </button>
        </div>
      </header>

      <main className="plantario-content">
        {cargando ? (  // Si estamos cargando, mostramos el spinner
          <div className="loading-container">
            <div className="spinner"></div>
            <p className="loading-text">Cargando datos de la planta...</p>
          </div>
        ) : (
          <div className="perfil-card">
            <div className="perfil-titulo">
              <img src={imagenes.logo || "/placeholder.svg"} alt="Planta" className="planta-logo" />
              <h2 className="perfil-heading">Perfil de tu planta</h2>
            </div>

            <form onSubmit={handleActualizar}>
              <div className="datos-header">
                <h3>Datos de tu planta</h3>
              </div>

              <div className="form-grid">
                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" value={datosPlanta.nombre || ""} onChange={handleChange} />
                  </div>

                  <div className="form-group">
                    <label htmlFor="diasRegado">Días de regado:</label>
                    <input
                      type="text"
                      id="diasRegado"
                      name="diasRegado"
                      value={datosPlanta.diasRegado || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="diasPodado">Días de podado:</label>
                    <input
                      type="text"
                      id="diasPodado"
                      name="diasPodado"
                      value={datosPlanta.diasPodado || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-column">
                  <div className="form-group">
                    <label htmlFor="compostaRegado">Composta regado:</label>
                    <input
                      type="text"
                      id="compostaRegado"
                      name="compostaRegado"
                      value={datosPlanta.compostaRegado || ""}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group descripcion-group">
                    <label htmlFor="descripcion">Descripción:</label>
                    <textarea
                      id="descripcion"
                      name="descripcion"
                      value={datosPlanta.descripcion || ""}
                      onChange={handleChange}
                      rows={5}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="botones-container">
                <button type="submit" className="btn-actualizar">
                  <img src={imagenes.hoja || "/placeholder.svg"} alt="Hoja" className="btn-icon" />
                  Actualizar datos
                </button>
                <button type="button" className="btn-eliminar" onClick={handleEliminar}>
                  <img src={imagenes.eliminar || "/placeholder.svg"} alt="Eliminar" className="btn-icon" />
                  Eliminar planta
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default PerfilPlanta;
