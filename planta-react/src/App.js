import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./pages/inicioSesion.jsx";
import Inicio from "./pages/Inicio.jsx";
import RegistrationForm from "./pages/registro.jsx";


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
