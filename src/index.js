//Librería importada para poder realizar el servidor
const express = require('express');

const path = require('path');

//Constante usada para manejar el servidor
const app = express();

//Importar las rutas
const routerPlanta= require('../routes/planta');

//Middleware para manejar el formato json
app.use(express.json());

//Usar las rutas
app.use('/planta', routerPlanta);

// Inicializar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Manejar una petición GET en la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;