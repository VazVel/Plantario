"use client"

import { useState } from "react"
import { useRouter } from 'next/navigation';
import "../styles/perfilPlanta.css"

const PerfilPlanta = () => {
  const router = useRouter();
  const imagenes = {
    logo: "../img/plantalogo.png",
    notificacion: "../img/notificacion.png",
    menu: "../img/menuBurger.png",
    hoja: "../img/hoja.png",
    eliminar: "../img/basuraIcon.png",
  }

  // Estado para los datos del formulario
  const [datosPlanta, setDatosPlanta] = useState({
    id: "",
    nombre: "",
    diasRegado: "",
    diasPodado: "",
    estatus: "",
    compostaRegado: "",
    descripcion: "",
  })

  // Manejador para actualizar los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setDatosPlanta({
      ...datosPlanta,
      [name]: value,
    })
  }

  // Manejador para el botón de actualizar
  const handleActualizar = (e) => {
    e.preventDefault()
    console.log("Datos actualizados:", datosPlanta)
  }

  // Manejador para el botón de eliminar
  const handleEliminar = () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta planta?")) {
      console.log("Planta eliminada")
    }
  }

  return (
    <div className="plantario-container">
      <header className="plantario-header">
        <h1 className="plantario-title" onClick={() => router.push('/base')}>PLANTARIO</h1>
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
                  <label htmlFor="id">ID Planta:</label>
                  <input type="text" id="id" name="id" value={datosPlanta.id} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="nombre">Nombre:</label>
                  <input type="text" id="nombre" name="nombre" value={datosPlanta.nombre} onChange={handleChange} />
                </div>

                <div className="form-group">
                  <label htmlFor="diasRegado">Días de regado:</label>
                  <input
                    type="text"
                    id="diasRegado"
                    name="diasRegado"
                    value={datosPlanta.diasRegado}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="diasPodado">Días de podado:</label>
                  <input
                    type="text"
                    id="diasPodado"
                    name="diasPodado"
                    value={datosPlanta.diasPodado}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="estatus">Estatus:</label>
                  <input type="text" id="estatus" name="estatus" value={datosPlanta.estatus} onChange={handleChange} />
                </div>
              </div>

              <div className="form-column">
                <div className="form-group">
                  <label htmlFor="compostaRegado">Composta regado:</label>
                  <input
                    type="text"
                    id="compostaRegado"
                    name="compostaRegado"
                    value={datosPlanta.compostaRegado}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group descripcion-group">
                  <label htmlFor="descripcion">Descripción:</label>
                  <textarea
                    id="descripcion"
                    name="descripcion"
                    value={datosPlanta.descripcion}
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
      </main>
    </div>
  )
}

export default PerfilPlanta
