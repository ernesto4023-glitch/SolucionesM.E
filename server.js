const express = require('express');
const path = require('path');
const fs = require('fs'); // ✅ FALTABA
const livereload = require('livereload');
const connectLiveReload = require('connect-livereload');

const app = express();

app.use(express.json());

// 👉 Livereload
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());

// 👉 Archivos estáticos (SOLO UNA VEZ)
app.use(express.static(path.join(__dirname, 'public')));

const archivo = path.join(__dirname, 'comentarios.json');


// 👉 GUARDAR COMENTARIO
app.post('/comentarios', (req, res) => {
  const nuevo = req.body;

  fs.readFile(archivo, 'utf8', (err, data) => {
    let comentarios = [];

    try {
      comentarios = JSON.parse(data || "[]");
    } catch (error) {
      console.log("Error parseando JSON:", error);
      comentarios = [];
    }

    comentarios.push(nuevo);

    fs.writeFile(archivo, JSON.stringify(comentarios, null, 2), (err) => {
      if (err) {
        console.log("Error guardando:", err);
        return res.status(500).json({ error: "Error guardando" });
      }

      res.json({ mensaje: "Guardado correctamente" });
    });
  });
});


// 👉 OBTENER COMENTARIOS
app.get('/comentarios', (req, res) => {
  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.log("Error leyendo archivo:", err);
      return res.json([]);
    }

    try {
      const comentarios = JSON.parse(data || "[]");
      res.json(comentarios);
    } catch (error) {
      console.log("Error parseando JSON:", error);
      res.json([]);
    }
  });
});


app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});