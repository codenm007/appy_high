import { async } from 'q';
import React, { useState,useRef,useEffect } from 'react';
import {io} from 'socket.io-client';

let socket:any;
const CONNECTION_PORT = "localhost:8081/";


const Landing_page = () => {
  

    useEffect(() => {
        console.log('frffrrff')
         socket = io(CONNECTION_PORT, {transports: ['websocket', 'polling', 'flashsocket']});

         socket.on("chat start", (data:any) => {
            console.log(data,"received from sockets")
        });

      }, [CONNECTION_PORT]);


      const connectcall = async() =>{
        await socket.emit("connect_random", "ggygygyygygy");
      }

  
  return (
    <div className='container'>
     <div className="card m-4" >
  <div className="card-body">
    <h5 className="card-title">Video Call anyone randomly</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <button className="btn btn-danger" onClick = {()=>connectcall()}>Connect Randomly</button>
  </div>
</div>
    </div>
  );
}

export default Landing_page;
