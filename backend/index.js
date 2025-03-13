//Librería importada para poder realizar el servidor
const express = require('express');


//Constante usada para manejar el servidor
const app = express();

//Importar las rutas
const routerPlanta= require('./routes/planta');

//Middleware para manejar el formato json
app.use(express.json());

//Usar las rutas
app.use('/planta', routerPlanta);

// Inicializar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Manejar una petición GET en la página principal
app.get('/', (req, res) => {
    res.send('¡Hola mundo!');
});

module.exports = app;