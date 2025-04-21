'use client'; 

import { useRouter } from 'next/navigation';
import '../../app/styles/Inicio.css'; 

const Inicio = () => {
  const router = useRouter();
  return (
    <div className='Fondo'>
      <h2 className='plantario'>PLANTARIO</h2>
      <button className='botonRegistrarse' onClick={() => router.push('/registro')} >
         Registrarse
      </button>

      <button className='botonCuenta' onClick={() => router.push('/iniciosesion')}>
         Ya tengo cuenta
      </button>
    </div>
  );
};

export default Inicio;
