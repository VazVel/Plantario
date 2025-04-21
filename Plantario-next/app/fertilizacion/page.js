"use client";
import { useState, useEffect } from "react";
import "../styles/fertilizacion.css";

const fertilizacion = () => {
   const [fechaActual, setFechaActual] = useState("");

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

            {/* Fecha actual */}
            <p className="fecha"> 
              {fechaActual}
            </p>

             {/* Botones*/}
             <a href="Inicio.jsx">
               <button className="boton1"> Riego </button>
             </a>

             <a href="Inicio.jsx">
               <button className="boton2"> Fertilización </button>
             </a>

        <div className="cuadro">
          <div className="Cubo">
             <div className="planta"></div>
             <p className="nombreplanta">Nombre de la planta</p>
             <p className="pregunta">Es hora de alimentar a tu planta, <br></br> ¿ya la fertilizaste?</p>
             <a href="Inicio.jsx">
               <button className="boton3"> Listo </button>
             </a>
          </div>
        </div>  

        


         </div>
      </div>   
    </div>
  )
}

export default fertilizacion
