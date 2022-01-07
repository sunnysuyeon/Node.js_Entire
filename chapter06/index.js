const { on } = require('events');
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
var port = process.env.PORT || 3030;

server.listen(port, function() {
    console.log('Server listening at port', port);
});

app.use(express.static(path.join(dirname, 'public')));

var roomOfUsers = {};

io.on('connection', function (socket) {
    var addUser = false;

    socket.on('join room', function (room) {
        socket.room = room;
        if(typeof roomOfUsers[socket.room] != 'number') {
            roomOfUsers[socket.room] = 0;
        }
        socket.join(socket.room);
    });

    socket.on('add user', function(username) {
        if(addedUser) return;

        socket.username = username;

        ++roomOfUsers[socket.room];
        addedUser = true;
        socket.emit('login', {
            numUsers: roomOfUsers[socket.room]
        });

        socket.broadcast.in(socket.room).emit('user joined', {
            username: socket.username,
            numUsers: roomOfUsers[socket.room]
        });
    });

    socket.on('new message', function (data) {
        socket.broadcast.in(socket.room).emit('new message', {
            username: socket.username,
            massage:data
        });
    });
    socket.on('disconnect', function () {
        if(addedUser) {
            --roomOfUsers[socket.room];
            if(roomOfUsers[socket.room] <= 0) {
                delete roomOfUsers[socket.room];
            }
            socket.leave(socket.room);

            socket.broadcast.in(socket.room).emit('user left', {
                username: socket.username,
                numUsers: roomOfUsers[socket.room]
            });
        }
    });

    socket.on('typing', function () {
        socket.broadcast.in(socket.room).emit('typing', {
            username: socket.username
        });
    });

    socket.on('stop typing', function () {
        socket.broadcast.in(socket.room).emit('stop typing', {
            username: socket.username
        });
    });
});

