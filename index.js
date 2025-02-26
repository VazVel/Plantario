//Librería importada para poder realizar el servidor
const express = require('express');

//Constante usada para manejar el servidor
const app = express();

app.use(express.json());

// Inicializar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

//Manejar una petición get en la pagina principal
app.get('/', (req,res)=>{
    res.send('<h1>Este es la pagina principal del proyecto|</h1>')
})

module.exports = app;