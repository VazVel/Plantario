import Image from "next/image";
import styles from "./page.module.css";
import Inicio from "./inicio/page"; 
import Registro from "./registro/page";
import Iniciosesion from "./iniciosesion/page"; 
import Registrodetalles from "./registrodetalles/page"; 
import Registroplantas from "./registroplanta/page"; 
import Base from "./base/page";
import Riego from "./riego/page";
import Inventario from "./inventario/page";
import PerfilPlanta from "./perfilPlanta/page";


export default function Home() {
  return (
    <div>
      <Inicio />
    </div>
  );
}
