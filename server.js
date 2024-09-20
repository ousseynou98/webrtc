const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

// Initialiser express et le serveur
const app = express();
const server = http.createServer(app);

// Ajouter le middleware CORS à Express
app.use(cors());

// Initialiser Socket.io avec la configuration CORS
const io = socketIo(server, {
  cors: {
    origin: "*", // Permettre toutes les origines, ou spécifier une URL spécifique
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

// Servir les fichiers statiques (le HTML, CSS, etc.)
app.use(express.static('public'));

// Logique de signalisation avec Socket.io
io.on('connection', (socket) => {
  console.log('Un utilisateur est connectfhé');

  // Gérer les offres de peer
  socket.on('offer', (offer) => {
    socket.broadcast.emit('offer', offer);
  });

  // Gérer les réponses de peer
  socket.on('answer', (answer) => {
    socket.broadcast.emit('answer', answer);
  });

  // Gérer les candidats ICE
  socket.on('ice-candidate', (candidate) => {
    socket.broadcast.emit('ice-candidate', candidate);
  });

  socket.on('disconnect', () => {
    console.log('Un utilisateur est déconnectéf');
  });
});

// Démarrer le serveur
server.listen(3000, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3000');
});
