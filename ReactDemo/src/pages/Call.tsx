import React, { useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import useAgora from "../hooks/useAgora";
import MediaPlayer from "../components/MediaPlayer";
import "./Call.css";
import { useStopwatch } from "react-timer-hook";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone,faMicrophoneSlash,faPhoneSlash } from '@fortawesome/free-solid-svg-icons'
import { Console } from "console";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });
const appid = "04cc72fdb6f64c308af7ad3a9868fe60";
const urlParams = new URLSearchParams(window.location.search);
//  const app_id = '04cc72fdb6f64c308af7ad3a9868fe60'
const room_id = String(urlParams.get("room"));
const token1 = String(urlParams.get("token")).replace(/ /g, "+");

let is_muted = false;

function Call() {


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



  const leave_call = () => {
    leave();
    window.open(`https://${window.location.hostname}`, "_self");
  };

  const mute_self_audio = () =>{

    is_muted = !is_muted;
    
    localAudioTrack?.setMuted(is_muted);
    
  }
const Detetct_camera_on = () => {
  //console.log(localVideoTrack,54)
  if(localVideoTrack === undefined){
    return (
      <>
      <div className="alert alert-warning" role="alert">
      <h4 className="alert-heading">Physical Camera Not Found !</h4>
      <p>No video device was found on your device.</p>
      <hr />
      <p className="mb-0">If your laptop has a physical camera please make sure to turn it on using Fn keys</p>
    </div>
     </>
    )
  }else{
    console.log('detect camera failed')
    return (
      <>
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
      </>
    )
  }

}

  return (
    <div className="call">

      
    {Detetct_camera_on()}

      {/* {console.log(localVideoTrack,8888)} */}

      <div id="navigation_buttons" className="">
        <div className="row">
          <div className="col-12 col-md-4">
           <button style = {{borderRadius:"20px"}} className ="btn btn-danger" onClick ={()=>mute_self_audio()}> {is_muted ?<FontAwesomeIcon icon={faMicrophoneSlash} size="2x"/>:<FontAwesomeIcon icon={faMicrophone} size="2x"/> }  </button>
          </div>

          <div className="col-12 col-md-4">
            <div id ="call_duration">
            <span className="badge rounded-pill bg-secondary"><span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span></span>
              
            </div>
          </div>

          <div className="col-12 col-md-4 " >
            <button
              id="leave"
              type="button"
              style = {{borderRadius:"20px"}}
              className="btn btn-primary btn-sm"
              disabled={!joinState}
              onClick={() => {
                leave_call();
              }}
            >
              <FontAwesomeIcon icon={faPhoneSlash} size="2x" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Call;
