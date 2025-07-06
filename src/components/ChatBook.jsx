import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/ConnectionSlice';
import axios from 'axios';
import { BaseURL } from '../utils/Constant';
import { CreateSocketConnection } from '../utils/socket';

const ChatBook = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.Connections?.data) || [];
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const user = useSelector((store) => store.user);
  const socketRef = useRef(null);

  useEffect(() => {
    const fetchConnections = async () => {
      if (connections.length > 0) return;
      try {
        const res = await axios.get(`${BaseURL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res.data));
      } catch (err) {
        console.error("ChatBook fetch error:", err.message);
      }
    };
    fetchConnections();
  }, [connections.length, dispatch]);

  useEffect(() => {
    if (!user?._id || !selectedChat?._id) return;

    if (!socketRef.current) {
      socketRef.current = CreateSocketConnection();
    }

    const socket = socketRef.current;

    socket.emit("joinChat", {
      firstName: user?.firstName,
      UserID: user?._id,
      targetUserId: selectedChat?._id,
    });

    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user?._id, selectedChat?._id]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const socket = socketRef.current;
    const msgObj = {
      firstName: user?.firstName,
      UserID: user?._id,
      targetUserId: selectedChat?._id,
      text: newMessage,
    };

    socket.emit("sendMessage", msgObj);
    setNewMessage(""); // ✅ DO NOT append to messages locally
  };

  if (selectedChat) {
    return (
      <div className='flex flex-col h-[90vh] bg-[#1f1f1f] text-white'>
        <div className='flex items-center gap-3 bg-green-700 px-4 py-3 shadow-md'>
          <button
            onClick={() => {
              setSelectedChat(null);
              setMessages([]);
            }}
            className='w-10 h-10 flex items-center justify-center text-black text-xl bg-white rounded-full hover:bg-gray-200'
          >
            ←
          </button>
          <img
            src={selectedChat.PhotoURL}
            alt='User'
            className='w-10 h-10 rounded-full border border-white object-cover'
          />
          <h2 className='text-lg font-semibold'>
            {selectedChat?.firstName} {selectedChat?.lastName}
          </h2>
        </div>

        {/* Render messages */}
        <div className='flex-1 overflow-y-auto p-4'>
          {messages.map((msg, idx) => {
            const isUser = msg.senderId === user._id;
            return (
              <div key={idx} className={`chat ${isUser ? "chat-end" : "chat-start"}`}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={isUser ? user?.PhotoURL : selectedChat?.PhotoURL}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="chat-header text-xs opacity-50">{msg.firstName}</div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className='flex items-center gap-2 p-4 bg-[#2a2a2a] border-t border-gray-700'>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                sendMessage();
              }
            }}
            className='flex-1 px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none'
            placeholder='Type a message...'
          />
          <button
            onClick={sendMessage}
            className='bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-full'
          >
            Send
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col h-screen bg-[#0f1115] text-white'>
      <div className='flex justify-between items-center px-6 py-4 bg-green-700'>
        <h1 className='text-2xl font-semibold'>MateChat</h1>
      </div>
      <div className='overflow-y-auto flex-1'>
        {connections.length > 0 ? (
          connections.map((conn) => (
            <div
              key={conn._id}
              onClick={() => setSelectedChat(conn)}
              className='flex justify-between items-center p-4 hover:bg-[#1a1d22] border-b border-[#23272e] cursor-pointer'
            >
              <div className='flex items-center gap-4'>
                <img
                  src={conn.PhotoURL}
                  alt='User'
                  className='w-12 h-12 rounded-full border border-green-500 object-cover'
                />
                <div>
                  <h2 className='text-green-300 text-lg font-semibold'>
                    {conn.firstName} {conn.lastName}
                  </h2>
                </div>
              </div>
              <button
                className='bg-green-600 hover:bg-green-800 px-4 py-2 rounded text-white text-sm'
              >
                Chat
              </button>
            </div>
          ))
        ) : (
          <p className='text-gray-400 text-center mt-8'>No connections found.</p>
        )}
      </div>
    </div>
  );
};

export default ChatBook;
