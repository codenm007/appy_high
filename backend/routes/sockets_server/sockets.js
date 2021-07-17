var sockets = {};

const random_connect = require("../../functions/random_connect");
 

const socket_jobs = (io) =>{
    io.on('connection', (socket) => {
        console.log('a user connected',socket.id);
       
        socket.on('connect_random',(data)=>{
          console.log('sddsdsdsds89898989')
          random_connect(socket);
        })
      
        socket.on("disconnect", () => {
          console.log("USER DISCONNECTED",socket.id);
        });
      });
      
}

module.exports = socket_jobs;