"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "../styles/inicioSesion.css";

const InicioSesion = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const res = await fetch("/api/iniciosesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });
  
      let data;
  
      // Intentar leer la respuesta como JSON
      try {
        data = await res.json();
      } catch (err) {
        console.warn("Error al leer JSON, revisa la respuesta del servidor:", err);
        setError("Respuesta del servidor no válida");
        return;
      }
  
      // Si la respuesta no es OK, manejar el error
      if (!res.ok) {
        setError(data?.error || "Error al iniciar sesión");
        return;
      }
  
      // Redirigir al dashboard si todo está correcto
      router.push("/registroplanta"); // Cambia esta ruta si es otra
    } catch (err) {
      console.error("Error en el cliente:", err);
      setError("Error en el servidor");
    }
  };
  

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(/img/mundo.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="content-wrapper">
        <div className="image-container"></div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h1 className="title">
              BIENVENIDO
              <br />
              DE NUEVO
            </h1>

            <div className="form-group">
              <label className="ay" htmlFor="correo">Ingrese su correo:</label>
              <input
                type="email"
                id="correo"
                className="form-inputa"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="by" htmlFor="password">Ingrese su contraseña</label>
              <input
                type="password"
                id="password"
                className="form-inputb"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="start-button">Comenzar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
