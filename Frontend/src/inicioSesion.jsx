import "./inicioSesion.css"
import mundo from "../img/mundo.png";


const LoginForm = () => {
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
              <label htmlFor="username">Ingrese su nombre de Usuario:</label>
              <input type="text" id="username" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Ingrese su contraseña</label>
              <input type="password" id="password" className="form-input" />
            </div>

            <button className="start-button">Comenzar</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm

