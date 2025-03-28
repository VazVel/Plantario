import React from 'react'
import '../styles/RegistroPlanta.css'

const RegistroPlanta = () => {
  return (
     <div className='Fondo'>
        <h1></h1>
        <h3>PLANTARIO</h3>

       <div className='container'>
          <div className='Complicated'>
             <h2>Registra tu planta y haz crecer tu jardin.</h2>
             <p className='Nombre'>Nombre:</p>
             <input className='NombreP' type="nombre" placeholder='Nombre de la Planta' required autoFocus/>
             <p className='Dias'>Dias que se riega</p>
             <input className='DiasP' type="number" placeholder='Cada dia o cada 2 dias' required/>
             <p className='Detalles'>¿Añadir más detalles?</p>
             <a href="Leccion.html"><button class="boton1" >Si</button></a> 
             <a href="Leccion.html"><button class="boton2" >No</button></a> 
          </div>
        </div> 
     </div>
  )
}

export default RegistroPlanta
