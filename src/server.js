const _app_folder = 'dist/buzzer-app/';
// Keep in sync with "app.module.ts"
const _ip = '192.168.86.91';
const _port = 3000;

const express = require("express");
const app = express();
const http = require('http');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server);

app.get('*.*', express.static(_app_folder));

app.all('*', function (_, res) {
  res.status(200).sendFile(`/`, {root: _app_folder});
});

const data = {
  users: new Set(),
  buzzes: new Set(),
  answers: new Set()
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

  socket.on('options-round-active', (isActive) => {
    io.emit('options-round-active', isActive);
  });

  socket.on('lock-active-answers', () => {
    io.emit('lock-active-answers');
  });

});

server.listen(_port, _ip, function () {
  console.log('Server running on ' + _ip + ':' + _port);
});