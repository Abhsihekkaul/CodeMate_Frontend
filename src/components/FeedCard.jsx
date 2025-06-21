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

      dispatch(setReceivedRequests(ConnectionReq.data));
      setIsVisible(false);
    } catch (err) {
      console.error("Error sending connection request:", err);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1D232A] text-white font-mono px-4">
      <div className="relative w-full max-w-sm h-[82vh] rounded-lg overflow-hidden shadow-xl shadow-green-800/10">
        <img
          src={profile.PhotoURL}
          alt="Developer"
          className="w-full h-full object-cover"
        />

        {/* Overlay content */}
        <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-black/10 px-4 py-4 text-white">
          <h1 className="text-lg font-bold tracking-widest">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-sm text-gray-300">{profile.About}</p>
          <p className="text-sm text-green-400 mt-1">Age: {profile.Age}</p>

          <div className="flex justify-between gap-3 mt-4">
            <button
              onClick={() => handleSendingRequest(profile._id, "interested")}
              className="flex-1 bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-sm transition-all duration-200 text-sm tracking-widest shadow hover:shadow-green-300"
            >
              Interested
            </button>
            <button
              onClick={() => handleSendingRequest(profile._id, "ignored")}
              className="flex-1 bg-red-500 hover:bg-red-400 text-white font-semibold py-2 rounded-sm transition-all duration-200 text-sm tracking-widest shadow hover:shadow-red-300"
            >
              Ignore
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
