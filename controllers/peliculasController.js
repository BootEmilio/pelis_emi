const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const dbConfig = {
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'Pelis_Emi'
};

const db = mysql.createConnection(dbConfig);

const obtenerPeliculas = (req, res) => {
    db.query('SELECT * FROM Peliculas', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener las películas');
        } else {
            res.json(results);
        }
    });
};

const obtenerPeliculaPorId = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Peliculas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al obtener la película');
        } else {
            if (results.length > 0) {
                res.json(results[0]);
            } else {
                res.status(404).send('Película no encontrada');
            }
        }
    });
};

const agregarPelicula = (req, res) => {
    const { titulo, director, genero, puntuacion, rating, año } = req.body;
    if (!titulo || !director || !genero || !puntuacion || !rating || !año) {
        return res.status(400).send('Faltan datos');
    }

    const query = `
        INSERT INTO Peliculas (titulo, director, genero, puntuacion, rating, año)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [titulo, director, genero, puntuacion, rating, año], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al agregar la película');
        } else {
            res.status(201).send('Película agregada con éxito');
        }
    });
};

const eliminarPelicula = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Peliculas WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar la película');
        } else {
            if (results.affectedRows > 0) {
                res.status(204).send();
            } else {
                res.status(404).send('Película no encontrada');
            }
        }
    });
};

const actualizarPelicula = (req, res) => {
    const { id } = req.params;
    const { titulo, director, genero, puntuacion, rating, año } = req.body;
    const query = `
        UPDATE Peliculas
        SET titulo = ?, director = ?, genero = ?, puntuacion = ?, rating = ?, año = ?
        WHERE id = ?
    `;
    db.query(query, [titulo, director, genero, puntuacion, rating, año, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al actualizar la película');
        } else {
            if (results.affectedRows > 0) {
                res.send('Película actualizada');
            } else {
                res.status(404).send('Película no encontrada');
            }
        }
    });
};

module.exports = {
    obtenerPeliculas,
    obtenerPeliculaPorId,
    agregarPelicula,
    eliminarPelicula,
    actualizarPelicula
};
