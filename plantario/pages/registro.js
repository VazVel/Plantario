"use client"

import { useState } from "react"
import "../pages/styles/RegistroPlanta.css"

const RegistroForm = ({ imagenFondo = "../img/fondo.png" }) => {
  const [formData, setState] = useState({
    nombre: "",
    apellido: "",
    apodo: "",
    correo: "",
    contrasena: "",
    confirmarContrasena: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Datos del formulario:", formData)
  }

  return (
    <div className="contenedor-principal" style={{ backgroundImage: `url(${imagenFondo})` }}>
      <div className="contenedor-formulario">
        <div className="encabezado">
          <h1>BIENVENIDO</h1>
          <h2>REGISTRESE</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="campo-formulario">
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </div>

          <div className="campo-formulario">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="apodo">Apodo</label>
            <input type="text" id="apodo" name="apodo" value={formData.apodo} onChange={handleChange} />
          </div>

          <div className="campo-formulario">
            <label htmlFor="correo">Correo</label>
            <input type="email" id="correo" name="correo" value={formData.correo} onChange={handleChange} required />
          </div>

          <div className="campo-formulario">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="confirmarContrasena">Confirme su contraseña</label>
            <input
              type="password"
              id="confirmarContrasena"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="boton-comenzar">
            Comenzar
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegistroForm

