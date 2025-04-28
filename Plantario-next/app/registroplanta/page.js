"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import "../styles/registroplanta.css";

const Registrop = () => {
    const router = useRouter();
    const [nombre, setNombre] = useState("");
    const [regadoDias, setRegadoDias] = useState("");
    const [fertilizadoDias, setFertilizadoDias] = useState("");
    const [podadoDias, setPodadoDias] = useState("");
    const [error, setError] = useState("");
    const [mensaje, setMensaje] = useState("");

    const imagenes = {
        planta: "../img/registroplanta.png",
        logo: "../img/hoja.png"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setMensaje("");

        try {
            const res = await fetch("/api/registroplanta", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nombre,
                    regadoDias: parseInt(regadoDias),
                    fertilizadoDias: parseInt(fertilizadoDias),
                    podadoDias: parseInt(podadoDias)
                })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Error al registrar la planta");
                return;
            }

            setMensaje("Planta registrada exitosamente");
            setNombre("");
            setRegadoDias("");
            setFertilizadoDias("");
            setPodadoDias("");

            // Mostrar alerta de éxito
            alert("Planta registrada exitosamente");

            // Redirigir a la página de inventario después de que el usuario cierre la alerta
            router.push("/inventario");

        } catch (err) {
            console.error("Error:", err);
            setError("Error al conectar con el servidor");
        }
    };

    return (
        <div className='plantario-container'>
            <header className='plantario-header'>
                <h1 className='plantario-title' onClick={() => router.push('/base')}>PLANTARIO</h1>
            </header>

            <main className='plantario-content'>
                <div className='perfil-card'>
                    <div className='perfil-titulo'>
                        <img src={imagenes.logo || "/placeholder.svg"} alt='Planta' className='planta-logo' />
                        <h2 className='perfil-heading'>Registra tu planta y haz crecer tu jardín.</h2>
                        <img src={imagenes.planta || "/placeholder.svg"} alt='Planta2' className='planta-fondo' />
                    </div>

                    <form className='form-grid' onSubmit={handleSubmit}>
                        <div className='form-column'>
                            <div className='form-group'>
                                <label htmlFor='nombre'>Nombre:</label>
                                <input type='text' id='nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='diasRegado'>Días de regado:</label>
                                <input type='number' id='diasRegado' value={regadoDias} onChange={(e) => setRegadoDias(e.target.value)} required />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='diasFertilizante'>¿Cada cuántos días fertilizas tu planta?</label>
                                <input type='number' id='diasFertilizante' value={fertilizadoDias} onChange={(e) => setFertilizadoDias(e.target.value)} required />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='diasPodar'>¿Cada cuántos días la podas?</label>
                                <input type='number' id='diasPodar' value={podadoDias} onChange={(e) => setPodadoDias(e.target.value)} required />
                            </div>

                            {error && <p className='error-message'>{error}</p>}
                            {mensaje && <p className='success-message'>{mensaje}</p>}

                            <div className='botones-container'>
                                <button type='submit' className='btn-guardar'>
                                    <img src={imagenes.logo || "/placeholder.svg"} alt='Hoja' className='btn-icon' />
                                    Guardar
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </main>
        </div>
    );
};

export default Registrop;
