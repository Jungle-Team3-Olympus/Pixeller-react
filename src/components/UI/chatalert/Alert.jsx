import React, { useState, useEffect } from 'react';
import './Alert.css';

const Alert = ({ message, senderName, duration, roomId, setRoomIdFirstSend }) => {
  const [show, setShow] = useState(false);

  console.log('Alert', message);
  
  const chatSound = new Audio("/sounds/chat_pop.mp3");

  useEffect(() => {
    if (message) {
      setShow(true);
      chatSound
        .play()
        .catch((error) => console.error("Error playing chatSound:", error));
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const roomOpenHandler = () => {
    setRoomIdFirstSend(roomId);
  }


  return (
    <div className={`alert ${show ? 'show' : 'hide'}`} onClick={roomOpenHandler}>
      <div className='content-div'>
        <span className='sender'>{senderName}</span>
        <span className='message'>{message}</span>
      </div>
      <button className='close' onClick={() => setShow(false)}>확인하기</button>
    </div>
  );
};

export default Alert;