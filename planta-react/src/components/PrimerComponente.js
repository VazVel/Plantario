import React, {useState} from 'react';

const PrimerComponente = () => {
    //let nombre = "Raquel";
    let web = " raquelweb.es";

    const [nombre, setNombre] = useState("Gandul");

    const cambiarNombre = (nuevoNombre) => {
        setNombre(nuevoNombre);
    }

  return (
    <div>
      <h1>Mi primer componente</h1>
      <p>Hola, ando haciendo pruebas</p>
      <p>Mi nombre es: <strong className={nombre.length >= 4 ? 'verde' : 'rojo'}>{nombre}</strong></p>
      <p>Mi web es:{web}</p>

     <input type='text' onChange={e => cambiarNombre(e.target.value)} placeholder='Nombre'></input>

      <button onClick={e => cambiarNombre("Itzel Amezcua Web")}>Cambiar Nombre</button>
    </div>
  )
}

export default PrimerComponente
