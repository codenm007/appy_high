import React, { useState,useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './hooks/useAgora';
import MediaPlayer from './components/MediaPlayer';
import './Call.css';
import { useStopwatch } from 'react-timer-hook';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });
const appid = '04cc72fdb6f64c308af7ad3a9868fe60';
const urlParams = new URLSearchParams(window.location.search);
  //  const app_id = '04cc72fdb6f64c308af7ad3a9868fe60'
    const room_id = String(urlParams.get('room'));
    const token1 = String(urlParams.get('token')).replace(/ /g,"+");


function Call() {

  

const {
  seconds,
  minutes,
  hours,
  isRunning
} = useStopwatch({ autoStart: true });
  
  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  useEffect(() => {
    join(appid, room_id, token1);
   
  },[])

  const leave_call = () =>{

    leave();
    window.open(`http://${window.location.hostname}:3000`,"_self");
  }

  return (
    <div className='call'>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer>
        </div>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
      <button id='leave' type='button' className='btn btn-primary btn-sm' disabled={!joinState} onClick={() => {leave_call()}}>Leave</button>
      <div style={{fontSize: '100px'}}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
    </div>
  );
}

export default Call;
