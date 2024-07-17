import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ChatDivComponent from './chat_div_component';

const Chat = ({stompClient}) => {
    const [messages, setMessages] = useState([]);
    const [chatList, setChatList] = useState([]);
    const user = jwtDecode(sessionStorage.getItem('user') );

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    const [chatRoomId, setChatRoomId] = useState(null);

    useEffect(() => {
        if (stompClient) {
            const subscribe = () => {
                // stompClient.send(`/sub/chat-room/${user.uid}?page=${page}&size=${size}`);
                stompClient.subscribe(`/sub/chat-room/${user.uid}?page=${page}&size=${size}`, (res) => {
                    console.log('TㅅT',res);
                    showChatList(JSON.parse(res.body));
                });
            };

            subscribe();
        }
    }, [stompClient]);

    const showChatList = (cl) => {
        console.log(cl);
        if(cl.content.length > 0){
            if(cl.currentPage === 0) setChatList(cl.content);
            else if(cl.currentPage > 0) setChatList(prevList => [...cl.content, ...prevList]);
        }
        // setMessages(prevMessages => [...prevMessages, message]);
        // console.log(chatList);
    }; 

    const joinRoomHandler = (e) => {
        const roomId = e.currentTarget.getAttribute('id');
        console.log(roomId);
        const splitedRoomId = roomId.split('-')[1];
        setChatRoomId(splitedRoomId);

        stompClient.subscribe(`/sub/message/direct/${splitedRoomId}`, (res) => {
            console.log('ㅗVㅗ',res);
        });


    }


    return (
        <>
            {chatRoomId!=null?
                <ChatDivComponent stompClient={stompClient} messages={messages} />
            :
            <div>
                {chatList.map((chat, index) => (
                    <div key={index} id={`roomid-${chat.chatRoomId}`} className={`chatbox `} onClick={joinRoomHandler}>
                        <span className="chat-room-id">{chat.chatRoomId}</span>
                        <span className="chat-room-message">{chat.message}</span>
                    </div>
                ))}
            </div>
            }
        </>
    );
};

export default Chat;