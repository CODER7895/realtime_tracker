const express = require('express');
const app = express();
const socket = require('socket.io');
const http = require('http');
const path = require('path');
const indexRouter = require('./routes/indexRouter');

const server = http.createServer(app);
const io = socket(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,"public")));

app.use('/',indexRouter);

io.on('connection', (socket)=>{
    socket.on('send-location', function (data){
        io.emit('receive-location', {id: socket.id, ...data});
    });
    socket.on('disconnect', function(){
        io.emit('user-disconnected', socket.id);
    });
    console.log('socket is connected');
});

server.listen(process.env.PORT || 3000);