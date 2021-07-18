import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "../hooks/useAgora";
import MediaPlayer from "../components/MediaPlayer";
import "./Call.css";
import { useStopwatch } from "react-timer-hook";
import { io } from "socket.io-client";
import loading from "../loading.gif";
import { Button, Modal } from "react-bootstrap";

let socket: any;
const CONNECTION_PORT = "localhost:8081/";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });
const appid = "04cc72fdb6f64c308af7ad3a9868fe60";
const urlParams = new URLSearchParams(window.location.search);
//  const app_id = '04cc72fdb6f64c308af7ad3a9868fe60'
const room_id = String(urlParams.get("room"));
const token1 = String(urlParams.get("token")).replace(/ /g, "+");

function Call() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { seconds, minutes, hours, isRunning } = useStopwatch({
    autoStart: true,
  });

  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);

  useEffect(() => {
    join(appid, room_id, token1);
  }, []);

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
    //leave()
    await socket.emit("connect_random", "ggygygyygygy");
  };

  const leave_call = () => {
    leave();
    window.open(`http://${window.location.hostname}:3000`, "_self");
  };

  const Connect_call = () => {
    return (
      <>
        <Button
          variant="danger"
          onClick={() => {
            handleShow();
          }}
        >
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
            <div className="d-flex justify-content-center">
              <img src={loading} width={"400px"} height={"250px"} />
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  return (
    <div className="call">
      <div className="player-container">
        <div className="local-player-wrapper" id="self_video">
          <MediaPlayer
            videoTrack={localVideoTrack}
            audioTrack={localAudioTrack}
          ></MediaPlayer>
        </div>
        {remoteUsers.map((user) => (
          <div
            className="remote-player-wrapper"
            id="remote_video"
            key={user.uid}
          >
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>

      <div id="navigation_buttons" className="d-flex justify-content-center">
        <div className="row">
          <div className="col-12 col-md-4">
            <Connect_call />
          </div>

          <div className="col-12 col-md-4">
            <div id ="call_duration">
            <span className="badge rounded-pill bg-secondary"><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></span>
              
            </div>
          </div>

          <div className="col-12 col-md-4">
            <button
              id="leave"
              type="button"
              className="btn btn-primary btn-sm"
              disabled={!joinState}
              onClick={() => {
                leave_call();
              }}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Call;
