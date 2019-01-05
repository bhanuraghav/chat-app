const path = require('path');
const express =require('express');
const socketIO =require('socket.io');
const http = require('http');
const app =express();
const {generateMessage} = require('./utils/message');


const port =process.env.PORT || 3000;
const publicPath = path.join(__dirname + './../public')
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
    console.log('New User connected');
   
    //socket.emit from Admin text welcome to chat room
    socket.emit('newMessage', generateMessage('Admin','welcome to chat room'));
    // socket.emit('newMessage', {
    //     from: "Admin",
    //     text : "welcome to chat room",
    //     createdAt : new Date().getTime()
    // })

    socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

    socket.on('createMessage',(message,callback)=>{
        console.log('createMessage',message);
        io.emit('newMessage',generateMessage(message.from,message.text))
        callback('This if from server');
    })
 
    socket.on('disconnect',()=>{
        console.log('User was disconnected');
    })
    
})


server.listen(port,()=>{
    console.log(`Started on ${port}`);
})