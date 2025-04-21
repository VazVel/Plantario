import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Página de Inicio</h1>
      <nav>
        <ul>
          <li><Link href="/inicio">Ir a Inicio</Link></li>
          <li><Link href="/iniciosesion">Iniciar Sesión</Link></li>
          <li><Link href="/registro">Registro</Link></li>
          <li><Link href="/registrodetalles">Registro Detalles</Link></li>
          <li><Link href="/registroplanta">Registro Planta</Link></li>
          <li><Link href="/base">Base</Link></li>
          <li><Link href="/riego">Riego</Link></li> 
          <li><Link href="/inventario">Inventario</Link></li> 
          <li><Link href="/perfilPlanta">PerfilPlanta</Link></li> 

        </ul>
      </nav>
    </div>
  );
}
