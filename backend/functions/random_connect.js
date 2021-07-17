let queue = []; 
let rooms = {}; 

//importing models
 let call_logs = require("../models/call_logs");

const random_connect = function(socket) {
  // this is place for possibly some extensive logic
  // which can involve preventing two people pairing multiple times
  //console.log(queue,"llo" , queue.length)
  if (queue.length !== 0) {
      // somebody is in queue, pair them!
      var peer = queue.pop();
      var room = socket.id + '#' + peer.id;
      // join them both
      peer.join(room);
      socket.join(room);
      // register rooms to their names
      rooms[peer.id] = room;
      rooms[socket.id] = room;

      const peer_ip = peer.request.connection.remoteAddress;
      const socket_ip = socket.request.connection.remoteAddress;

      //noting connections between ips

      const new_call_log = new call_logs({
        id_1_address:socket.id,
        id_1_ip_address:socket_ip,
        id_2_address:peer.id,
        id_2_ip_address:peer_ip
      })

      new_call_log.save()
      .then((data)=>{
        console.log(peer_ip,socket_ip,data,23);
        // exchange names between the two of them and start the chat
        peer.emit('chat start',room);
        socket.emit('chat start',room);
        console.log("rearggghjk",53)
      })
      .catch(err => {
          console.log(err);
      })
  } else {
      // queue is empty, add our lone socket
      queue.push(socket);
  }
}

module.exports = random_connect
