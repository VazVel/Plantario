"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import '../styles/RegistroDetalles.css'

const RegistroPlanta = () => {
  const router = useRouter();

  //Esto es para que cuando el usuario le de enter en un input de un salto al siguiente input
  const inputsRef = useRef([]);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        let index = inputsRef.current.indexOf(document.activeElement);
        if (index > -1 && index < inputsRef.current.length - 1) {
          inputsRef.current[index + 1].focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);



  // Esto es para que cambie el color de los botones cuando se pase el mouse
  const [botonActivo, setBotonActivo] = useState(null);

  // Función para cambiar el estilo al pasar el cursor
  const handleMouseOver = (index) => {
    setBotonActivo(index);
  };

  // Función para restaurar el color original
  const handleMouseOut = () => {
    setBotonActivo(null);
  };


  return (
    <div className='Fondo'>
      <link rel="icon" href="/img/logoinventario.png" />
      <h1></h1>
      <h3 onClick={() => router.push('/base')}>PLANTARIO</h3>

      <div className='container'>
        <div className='Complicated'>
          <div className="imagenRegistrar"></div>
          <h2>Cuentanos más de tu planta.</h2>
          
          <p className='Fertilizante'>¿Cada cuántos días le pones fertilizante a tu planta?</p>
          <input 
            className='FertilizanteP' type="number" placeholder='1 o 2 veces por semana' required autoFocus
            ref={(el) => (inputsRef.current[0] = el)}
          />

          <p className='Podar'>¿Cada cuánto dáas la sueles podar?</p>
          <input 
            className='PodarP' type="number" placeholder='Cada 2 o 3 semanas' required
            ref={(el) => (inputsRef.current[1] = el)}
          />

          <p className='Composta'>¿Cada cúanto agregas composta?</p>
          <input 
            className='CompostaP' type="number" placeholder='Cada 1 o 2 semanas' required
            ref={(el) => (inputsRef.current[2] = el)}
          />


          
            <button className="boton" onMouseOver={() => handleMouseOver(3)} onMouseOut={handleMouseOut}
              onClick={() => router.push('/inventario')}
              style={{ backgroundColor: botonActivo === 3 ? "#00bf63" : "#7ed957",
                       color: "#21522d"
              }}
            >
              Añadir planta
            </button>
          
        </div>
      </div> 
    </div>
  );
};

export default RegistroPlanta;
