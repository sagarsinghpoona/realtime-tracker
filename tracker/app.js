const express = require('express');
const app = express();
const path = require('path');

const http = require('http');
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);


app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


io.on("connection",function(socket){
    socket.on("send-location",function(data){
        io.emit("receive-location",{ id:socket.id, ...data});
    })
    console.log("Client connected");

    socket.on("disconnect",function(){
        io.emit("user-disconnected",socket.id)
        console.log("user-disconnected")
    })



})




app.get('/',(req,res)=>{
    res.render('index');
})













server.listen(3000,()=>{
    console.log("server is running at port 3000")
})