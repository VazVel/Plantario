import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InicioSesion from "./pages/inicioSesion.jsx";
import Inicio from "./pages/Inicio.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Inicio />} />  {/* Página principal */}
        <Route path="/iniciosesion" element={<InicioSesion />} />

      </Routes>
    </Router>
  );
}

export default App;
