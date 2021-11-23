const _port = 3000;
const _app_folder = 'dist/brodown-showdown-app/';

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
  buzzes: new Set()
}

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
});

server.listen(_port, function () {
    console.log("Server running on http://localhost:" + _port);
});