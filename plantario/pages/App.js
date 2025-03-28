import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./Pantallas/inicioSesion.jsx";
import Inicio from "./Pantallas/Inicio.jsx";
import RegistrationForm from "./Pantallas/registro.jsx";
import RegistroPlanta from "./Pantallas/RegistroPlanta.jsx"
import Base from "./Pantallas/base.jsx"
import RegistroDetalles from "./Pantallas/RegistroDetalles.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />  {/* Página principal */}
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistrationForm />} />
        <Route path="/registroplanta" element={<RegistroPlanta />} />
        <Route path="/base" element={<Base />} />
        <Route path="/registrodetalles" element={<RegistroDetalles />} />
      </Routes>
    </Router>
  );
}

export default App;

