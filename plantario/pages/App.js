import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./Pantallas/inicioSesion.jsx";
import Inicio from "./Pantallas/Inicio.jsx";
import RegistrationForm from "./Pantallas/registro.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />  {/* Página principal */}
        <Route path="/iniciosesion" element={<InicioSesion />} />
        <Route path="/registro" element={<RegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default App;

