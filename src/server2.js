const _port = 3000;

const express = require("express");
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.use(cors({
  origin: 'https://www.bergur.dk',
  methods: ['GET', 'POST'],
  credentials: true,
}));

const data = {
  users: new Set(),
  buzzes: new Set(),
  answers: new Set(),
};

io.on('connection', (socket) => {
  socket.on('join', (user) => {
    data.users.add(user);
    io.emit('active-players', [...data.users].length);

    console.log(`${user.displayName} joined!`);
  });

  socket.on('buzz', (user) => {
    data.buzzes.add(user);
    io.emit('active-buzzes', [...data.buzzes]);

    console.log(`${user.displayName} :: buzz`);
  });

  socket.on('clear', () => {
    data.buzzes = new Set();
    io.emit('active-buzzes', [...data.buzzes]);
  });

  socket.on('answer', (answer) => {
    data.answers.add(answer);
    io.emit('active-answers', [...data.answers]);

    console.log(`${answer.playerDisplay} :: ${answer.option}`);
  });

  socket.on('reset-active-answers', () => {
    data.answers = new Set();
    io.emit('active-answers', [...data.answers]);
    io.emit('reset-active-answers');
  });

  socket.on('set-active-round', (options) => {
    io.emit('set-active-round', options);
  });

  socket.on('lock-active-answers', () => {
    io.emit('lock-active-answers');
  });

  socket.on('plus-minus-answer', (options) => {
    io.emit('plus-minus-answer', options);
  })

});

server.listen(_port, function () {
  console.log(`Server running on port ${_port}`);
});