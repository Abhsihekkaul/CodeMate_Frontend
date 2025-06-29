import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/ConnectionSlice';
import axios from 'axios';
import { BaseURL } from '../utils/Constant';
import { CreateSocketConnection } from '../utils/socket';

const ChatBook = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.Connections?.data) || [];
  const [selectedChat, setSelectedChat] = useState(null);
  const user = useSelector((store)=>store.user);

  useEffect(() => {
    const fetchConnections = async () => {
      if (connections.length > 0) return;
      try {
        const res = await axios.get(`${BaseURL}/user/connections`, {
          withCredentials: true,
        });
        dispatch(addConnections(res.data));
      } catch (err) {
        console.log("ChatBook fetch error:", err.message);
      }
    };

    fetchConnections();
  }, [connections.length, dispatch]);


  useEffect(()=>{
    const socket = CreateSocketConnection();
    socket.emit("joinChat", {
      firstName : user?.[0]?.firstName,
      UserID : user?.[0]?._id,
      TargetName : selectedChat?.firstName ,
      targetUserId : selectedChat?._id,
      });

    return () => {
      socket.disconnect();
    }
  },[user?.[0]?._id, selectedChat?._id])

  if (selectedChat) {
    return (
      <div className='flex flex-col h-[90vh] bg-[#1f1f1f] text-white'>
        {/* 🔙 Top Bar */}
        <div className='flex items-center gap-3 bg-green-700 px-4 py-3 shadow-md'>
          <button
            onClick={() => setSelectedChat(null)}
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

        {/* 💬 Chat Area */}
        <div className='flex-1 overflow-y-auto p-4'>
          <div className="chat chat-start">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={selectedChat?.PhotoURL}
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className="chat-bubble">You were the Chosen One!</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src={user?.[0]?.PhotoURL}
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">12:46</time>
            </div>
            <div className="chat-bubble">I hate you!</div>
            <div className="chat-footer opacity-50">Seen at 12:46</div>
          </div>
        </div>

        {/* ✏️ Input Area */}
        <div className='flex items-center gap-2 p-4 bg-[#2a2a2a] border-t border-gray-700'>
          <input
            type="text"
            className='flex-1 px-4 py-2 rounded-full bg-gray-800 text-white focus:outline-none'
            placeholder='Type a message...'
          />
          <button className='bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-full'>
            Send
          </button>
        </div>
      </div>
    );
  }

  // 📖 Chat List
  return (
    <div className='flex flex-col h-screen bg-[#0f1115] text-white'>
      {/* 🔝 Header */}
      <div className='flex justify-between items-center px-6 py-4 bg-green-700'>
        <h1 className='text-2xl font-semibold'>MateChat</h1>
        {/* You can uncomment for search input */}
        {/* <input type="text" placeholder="Search..." className="bg-white px-3 py-1 rounded" /> */}
      </div>

      {/* 📇 Connections List */}
      <div className='overflow-y-auto flex-1'>
        {connections.length > 0 ? (
          connections.map((conn) => (
            <div
              key={conn._id}
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
                onClick={() => setSelectedChat(conn)}
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
