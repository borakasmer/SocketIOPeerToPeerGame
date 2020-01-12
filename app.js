const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
socketList = [];
server.listen(1923);

io.on('connection', (socket) => {
    console.log('User Socket Connected :' + socket.id);
    //io.sockets.to(socket.id).emit("getSocketID", socket.id);
    socketList.push(socket.id);

    io.sockets.to(socket.id).emit("currentSocketID", socket.id);
    io.emit("getSocketID", socketList);

    socket.on("disconnect", () => {
        console.log(`${socket.id} User disconnected.`)

        const index = socketList.indexOf(socket.id);
        if (index !== -1) {
            socketList.splice(index, 1);
        }

        io.emit("leaveSocketID", socket.id);
    });

    socket.on("sendUpdatePicture", function (picture) {
        console.log("New Picture:" + picture.Name + ' ' + picture.Url);
        io.sockets.to(picture.socketID).emit("changePicture", picture);
    });
});
