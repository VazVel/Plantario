"use client";

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import "../styles/registroplanta.css";

const registrop = () => {
    const router = useRouter();

   const imagenes = {
      planta: "../img/registroplanta.png",
      logo: "../img/hoja.png"
   };

   return (
       <div className='plantario-container'>
          <header className='plantario-header'>
             <h1 className='plantario-title' onClick={() => router.push('/base')}>PLANTARIO</h1>
          </header>

          <main className='plantario-content'>
            <div className='perfil-card'> 
               <div className='perfil-titulo'>
                  <img src={imagenes.logo || "/placeholder.svg"} alt='Planta' className='planta-logo'></img>
                  <h2 className='perfil-heading'>Registra tu planta y haz crecer tu jardín.</h2>
                  <img src={imagenes.planta || "/placeholder.svg"} alt='Planta2' className='planta-fondo'></img>
               </div>

              <div className='form-grid'>
                <div className='form-column'>
                  <div className='form-group'>
                     <label htmlFor='nombre'>Nombre:</label>
                     <input type='text' id='nombre' name='nombre'></input>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='diasRegado'>Dias de regado:</label> 
                     <input type='text'id='diasRegado'name='diasRegado'></input>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='diasFertilizante'>¿Cada cuantos dias le pones fertilizante a tu planta?</label> 
                     <input type='text'id='diasFertilizante'name='diasFertilizante'></input>
                  </div>

                  <div className='form-group'>
                    <label htmlFor='diasPodar'>¿Cada cuanto días la sueles podar?</label> 
                     <input type='text'id='diasPodar'name='diasPodar'></input>
                  </div>

                  <div className='botones-container'>
                     <button type='submit' className='btn-guardar'>
                        <img src={imagenes.logo || "/placeholder.svg"} alt='Hoja' className='btn-icon'></img>
                        Guardar
                     </button>
                  </div>
                </div>
               </div> 

            </div>
          </main>
      </div>


  )
}

export default registrop
