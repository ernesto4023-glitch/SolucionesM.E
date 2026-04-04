const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');
const mysql = require('mysql2');

const app = express();

app.use(express.json());

/* 🔥 LIVERELoad */
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

/* 📁 ARCHIVOS ESTÁTICOS */
app.use(express.static(path.join(__dirname, 'public')));

/* 🛢️ CONEXIÓN MYSQL */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comentarios_db'
});

db.connect(err => {
  if (err) {
    console.log("❌ Error conexión:", err);
  } else {
    console.log("🔥 MySQL conectado");
  }
});

/* 💾 GUARDAR COMENTARIO */
app.post('/comentarios', (req, res) => {
  const { nombre, servicio, calificacion, comentario } = req.body;

  if (!nombre || !servicio || !comentario || !calificacion) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const sql = `
    INSERT INTO comentarios (nombre, servicio, calificacion, comentario)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [nombre, servicio, calificacion, comentario], (err, result) => {
    if (err) {
      console.log("❌ ERROR SQL:", err);
      return res.status(500).json({ error: "Error guardando" });
    }

    console.log("✅ INSERTADO:", result);

    res.json({ mensaje: "Comentario guardado correctamente" });
  });
});

/* 📥 OBTENER COMENTARIOS */
app.get('/comentarios', (req, res) => {
  const sql = "SELECT * FROM comentarios ORDER BY fecha DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.log("❌ ERROR:", err);
      return res.status(500).json([]);
    }

    res.json(results);
  });
});

app.get('/promedio', (req, res) => {
  const sql = `
    SELECT 
      AVG(calificacion) AS promedio,
      COUNT(*) AS total
    FROM comentarios
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({});
    }

    res.json(result[0]);
  });
});

/* 🚀 SERVIDOR */
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});