import { async } from "q";
import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { io } from "socket.io-client";
import loading from '../loading.gif';

let socket: any;
const CONNECTION_PORT = "localhost:8081/";



const Landing_page = () => {
  useEffect(() => {
    console.log("frffrrff");
    socket = io(CONNECTION_PORT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("chat start", (data: any) => {
      console.log(data.room_name, "received from sockets");
      window.open(
        `http://${window.location.hostname}:3000/connect_call?room=${data.room_name}&token=${data.token}`,
        "_self"
      );
    });
  }, [CONNECTION_PORT]);

   const add_to_waiting_list = async () => {
    await socket.emit("connect_random", "ggygygyygygy");
   };

  const Connect_call = () => {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
  
    return (
      <>
        <Button variant="danger" onClick={()=>{add_to_waiting_list(); handleShow()}}>
          Connect Call Randomly
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          
          <Modal.Body>
            <p>Please wait while we connect you to someone special </p>
            <div className = "d-flex justify-content-center">
            <img src = {loading}  width = {'400px'} height = {'250px'}/>
            </div>
            
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (
    <div className="container">
      <div className="card m-4">
        <div className="card-body">
          <h5 className="card-title">Video Call anyone randomly</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          {/* <button className="btn btn-danger" onClick={() => connectcall()}>
            Connect Randomly
          </button> */}
          <Connect_call />
        </div>
      </div>
    </div>
  );
};

export default Landing_page;
