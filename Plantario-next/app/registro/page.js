"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import "../styles/registro.css";
import Swal from 'sweetalert2';


const RegistroForm = ({ imagenFondo = "../img/fondo.png" }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido1: "",
    apellido2: "",
    apodo: "",
    correo: "",
    password: "",
    confirmarpassword: "",
  });
  const router = useRouter(); // Usamos useRouter para la navegación

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verifica que las contraseñas coincidan antes de enviar
    if (formData.password !== formData.confirmarpassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Elimina confirmarpassword antes de enviar los datos
    const { confirmarpassword, ...dataToSend } = formData;

    try {
      const response = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (response.ok) {
        
        await Swal.fire({
                  title: '¡Éxito!',
                  text: 'Cuenta creada con exito.',
                  icon: 'success',
                  confirmButtonColor: '#4caf50',
                  confirmButtonText: 'Aceptar'
                });

        router.push("/iniciosesion");
        console.log("Usuario registrado:", data);
      } else {
        alert("Error en el registro: " + data.error);
      }
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

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
            <label htmlFor="apellido1">Primer apellido</label>
            <input type="text" id="apellido1" name="apellido1" value={formData.apellido1} onChange={handleChange} required />
          </div>

          <div className="campo-formulario">
            <label htmlFor="apellido2">Segundo apellido</label>
            <input type="text" id="apellido2" name="apellido2" value={formData.apellido2} onChange={handleChange} required />
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
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="campo-formulario">
            <label htmlFor="confirmarpassword">Confirme su contraseña</label>
            <input type="password" id="confirmarpassword" name="confirmarpassword" value={formData.confirmarpassword} onChange={handleChange} required />
          </div>

          <button type="submit" className="boton-comenzar" onClick={() => router.push('/base')}>
             Comenzar
          </button>

        </form>
      </div>
    </div>
  );
};

export default RegistroForm;
