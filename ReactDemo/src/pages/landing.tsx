
import './landing.css';
import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { io } from "socket.io-client";
import loading from '../media/loading.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

const background_video = require( '../media/video.mp4');

let socket: any;
const CONNECTION_PORT = "talkfreeely.herokuapp.com/";



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
          <div >
            <strong>Connect Call Randomly </strong>
          <FontAwesomeIcon icon={faPhoneAlt} size="1x" className ="mx-2"/>
          </div>
         
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          
          <Modal.Body>
            <p>Please wait while we connect you to someone special ! </p>
            <div className = "d-flex justify-content-center">
            <img src = {loading}  width = {'400px'} height = {'250px'}/>
            </div>
            
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return (

    <div className="container-fluid ">
      <div className ="parent-element-to-video">
      <video autoPlay loop muted id = "bg_video">
        <source src = {background_video} type = "video/mp4" />
      </video>
      </div>

      <div className="card m-4" id ="welcome_card">
        <div className="card-body">
          <h4 className="card-title" style = {{fontSize:"2rem",fontWeight:"bolder"}}> Meet with Intresting Peole , Experiece different Cultures !</h4>
          <hr />
          <p className="card-text"  style = {{fontSize:"1rem",fontWeight:"bolder",color:"grey"}} >
            Currently bored in home , dont know what to do ?
            No roblem TalkFreely is here!
            
          </p>
          
          <ul style ={{color:"blue" , fontSize:"1.3rem", fontWeight:"bold"}}>
              <li>HD video call</li>
              <li>Talk with Strangers</li>
              <li>Unlimited Hours!</li>
              <li>No Restrictions</li>
            </ul>
          {/* <button className="btn btn-danger" onClick={() => connectcall()}>
            Connect Randomly
          </button> */}
          
          <hr />
          <div className = "d-flex justify-content-center">
          <Connect_call />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing_page;
