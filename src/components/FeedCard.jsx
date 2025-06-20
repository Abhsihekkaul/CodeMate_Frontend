import React, { useState } from 'react';
import axios from 'axios';
import { BaseURL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { setReceivedRequests } from '../utils/RequestSlice';

const FeedCard = ({ profile }) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(true); 
  const handleSendingRequest = async (ID, statusClicked) => {
    try {
      const ConnectionReq = await axios.post(
        `${BaseURL}/request/send/${statusClicked}/${ID}`,
        {},
        { withCredentials: true }
      );
      if (!ConnectionReq) return;

      console.log(ConnectionReq.data);
      dispatch(setReceivedRequests(ConnectionReq.data));

      // hide the card
      setIsVisible(false);
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  if (!isVisible) return null; // don't render if request sent

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1D232A] text-green-400 font-mono px-4">
      <div className="border border-green-500 w-full max-w-md p-8 rounded-lg bg-[#0f1115] shadow-lg shadow-green-800/10">
        <div className="flex flex-col items-center">
          <img
            src={profile.PhotoURL}
            alt="Developer"
            className="w-64 h-64 object-cover mb-6 border-2 border-green-500 shadow-md"
          />
          <h1 className="text-xl tracking-widest">{profile.firstName} {profile.lastName}</h1>
          <p className="text-sm text-green-300 mt-2 mb-4 text-center">{profile.About}</p>
          <p className="text-green-500 mb-2">Age: {profile.Age}</p>
          <div className="flex w-full justify-between gap-4 mt-6">
            <button
              onClick={() => handleSendingRequest(profile._id, "interested")}
              className="flex-1 bg-green-600 hover:bg-green-500 text-[#0f1115] font-bold py-2 rounded-sm transition-all duration-200 tracking-widest shadow-md hover:shadow-green-500/20"
            >
              interested
            </button>
            <button
              onClick={() => handleSendingRequest(profile._id, "ignored")}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-2 rounded-sm transition-all duration-200 tracking-widest shadow-md hover:shadow-red-500/20"
            >
              ignored
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
