import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/ConnectionSlice';
import axios from 'axios';
import { BaseURL } from '../utils/Constant';

const ChatBook = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.Connections?.data || []);
  const [selectedChat, setSelectedChat] = useState(null); // 🟡 New state

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

  // 🔷 If a chat is selected, render the chat window
  if (selectedChat) {
    return (
      <div className='w-full h-screen bg-[#1f1f1f] text-white'>
        <div className='flex items-center gap-3 bg-green-700 p-4'>
          <button onClick={() => setSelectedChat(null)} className='text-white text-5xl'>←</button>
          <img
            src={selectedChat.PhotoURL}
            alt='User'
            className='w-10 h-10 rounded-full border border-white object-cover'
          />
          <h2 className='text-lg font-semibold'>
            {selectedChat.firstName} {selectedChat.lastName}
          </h2>
        </div>

        {/* 🟩 Chat area (replace this with your chat logic/component) */}
        <div className='p-4'>
          <p>Chat with {selectedChat.firstName} goes here...</p>
        </div>
      </div>
    );
  }

  // 🔷 If no chat is selected, render the chat book list
  return (
    <>
      <div className='w-full bg-green-700'>
        <h1 className='text-2xl mx-[41%] py-3 font-semibold text-white'>CHATs</h1>
      </div>

      <div className='py-3'>
        {connections.length > 0 ? (
          connections.map((conn) => (
            <div
              key={conn._id}
              className='flex justify-between items-center p-4 bg-[#0f1115] rounded-lg mb-4 w-full cursor-pointer'
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
                onClick={() => setSelectedChat(conn)} // 🟡 Open Chat
              >
                Chat
              </button>
            </div>
          ))
        ) : (
          <p className='text-white text-center mt-8'>No connections found.</p>
        )}
      </div>
    </>
  );
};

export default ChatBook;
