"use client"
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import '../styles/RegistroPlanta.css'

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
      <h1></h1>
      <h3>PLANTARIO</h3>

      <div className='container'>
        <div className='Complicated'>
          <div className="imagenRegistrar"></div>
          <h2>Registra tu planta y haz crecer tu jardín.</h2>
          
          <p className='Nombre'>Nombre:</p>
          <input className='NombreP' type="text" placeholder='Nombre de la Planta'  required autoFocus
            ref={(el) => (inputsRef.current[0] = el)}
          />

          <p className='Dias'>Días que se riega:</p>
          <input className='DiasP'  type="number" placeholder='Cada día o cada 2 días' required
            ref={(el) => (inputsRef.current[1] = el)}
          />

          <p className='Detalles'>¿Añadir más detalles?</p>

          {/* Botones con efectos de hover */}
          
            <button className="boton1" onMouseOver={() => handleMouseOver(1)}onMouseOut={handleMouseOut}
              onClick={() => router.push('/registrodetalles')}
              style={{backgroundColor: botonActivo === 1 ? "#00bf63" : "#7d8078",
                      color: "black"  
              }}
            >
              Sí
            </button>
          

            <button className="boton2"  onMouseOver={() => handleMouseOver(2)}onMouseOut={handleMouseOut}
              style={{backgroundColor: botonActivo === 2 ? "#00bf63" : "#7d8078",
                     color: "black"
              }}
            >
              No
            </button>


            <button className="boton3"  onMouseOver={() => handleMouseOver(3)} onMouseOut={handleMouseOut}
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
