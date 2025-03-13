import "./registro.css"
import fondo from "../img/fondo.png";

const RegistrationForm = () => {
    return (
      <div
        className="registration-container"
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
      <div className="content-wrapper">
        {/* Header Section */}
        <div className="welcome-header">
          <h1>BIENVENIDO</h1>
          <h2>REGISTRESE</h2>
        </div>

        {/* Form Section */}
        <div className="form-container">
          <form className="registration-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre</label>
              <input type="text" id="nombre" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="apellido">Apellido</label>
              <input type="text" id="apellido" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="apodo">Apodo</label>
              <input type="text" id="apodo" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="correo">Correo</label>
              <input type="email" id="correo" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" className="form-input" />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Confirme su contraseña</label>
              <input type="password" id="confirm-password" className="form-input" />
            </div>

            <button type="submit" className="start-button">
              Comenzar
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistrationForm

