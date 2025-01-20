const express = require('express');
const peliculasController = require('./controllers/peliculasController');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

app.get('/api/films', peliculasController.obtenerPeliculas);
app.get('/api/films/:id', peliculasController.obtenerPeliculaPorId);
app.post('/api/films', peliculasController.agregarPelicula);
app.delete('/api/films/:id', peliculasController.eliminarPelicula);
app.patch('/api/films/:id', peliculasController.actualizarPelicula);

app.listen(port, () => {
    console.log(`API de Películas en http://localhost:${port}`);
});
