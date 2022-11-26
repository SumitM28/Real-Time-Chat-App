const express=require("express");
const app=express();
const http=require('http').createServer(app)
const io=require('socket.io')(http);
const PORT=process.env.PORT||4500;


app.use(express.static(__dirname+'/public'));
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
   
})

io.on('connection',(socket)=>{
    // console.log('A new user coming')
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg)
    })
})

http.listen(PORT,()=>{
    console.log(`server has been started at the port ${PORT}`)
})