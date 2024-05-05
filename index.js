const express=require("express");
const socket=require("socket.io");
const http=require("http");
const app= express();
const path=require("path");
app.use(express.static(path.join(__dirname,"./public")));

const server=http.createServer(app);
const io=socket(server);
const port=7000;
const users={};
//socket
io.on("connection" , client => {
    
    client.on('newname', message =>{
       users[client.id]=message;
        client.broadcast.emit('message',message);
       
    });
    //receiving msg from client side
    client.on('user-msg' , (data)=>{
       
       client.broadcast.emit('recieveMsg',{message : data, name:users[client.id]});
    
    });
    client.on('disconnect' , (name)=>{
       
        client.broadcast.emit('left',users[client.id])});
     delete users[socket.id];
     });



app.get("/", (req, res) => {
    res.sendFile("index.html"); 
});
server.listen(port,()=>{
    console.log("suuce");
});


// const io=require("socket.io")(7000)
// const users={};

// io.on('connection' ,(socket)=>{
//     socket.on('new-user',name=>{
//         users[socket.id]=name;
//         socket.broadcast.emit('load-users',name);
//     });
// });