import "../styles/inicioSesion.css";
import mundo from "../../public/img/fondo.png";


const inicioSesion = () => {
  return (
    <div className="login-container"
        style={{
          backgroundImage: `url(${mundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
    >
      

      <div className="content-wrapper">
        {/* Sección de imagen a la izquierda */}
        <div className="image-container"></div>

        {/* Formulario a la derecha */}
        <div className="form-container">
          <div className="login-form">
            <h1 className="title">
              BIENVENIDO
              <br />
              DE NUEVO
            </h1>

            <div className="form-group">
              <label className="ay" htmlFor="username">Ingrese su nombre de Usuario:</label>
              <input type="text" id="username" className="form-inputa" />
            </div>

            <div className="form-group">
              <label className="by" htmlFor="password">Ingrese su contraseña</label>
              <input type="password" id="password" className="form-inputb" />
            </div>

            <button className="start-button">Comenzar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default inicioSesion