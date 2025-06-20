// src/components/RequestCard.js
import axios from 'axios';
import React from 'react';
import { BaseURL } from '../utils/Constant';

const RequestCard = ({ data, reqID }) => {
    const user = data?.fromUserId;
    const HandleReviewRequest = async (ReviewStatus, ID) => {
        try{
            const req = await axios.post(`${BaseURL}/request/review/${ReviewStatus}/${ID}`,{},{withCredentials:true}) 
        }catch(err){
            res.json({
                message : `Error : ${err}`,
            })
        }
    }
  return (
    <div className="bg-[#0f1115] border border-green-600 rounded-lg p-4 w-full shadow-md shadow-green-500/10 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left section: Profile info */}
        <div className="flex items-center gap-4">
          <img
            src={user.PhotoURL}
            alt="User"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-green-500 object-cover"
          />
          <div>
            <h2 className="text-lg sm:text-xl text-green-400 font-semibold tracking-wide">
              {user.firstName} {user.lastName} {reqID} 
            </h2>
            <p className="text-green-300 text-sm sm:text-base">
              {user.About || "No bio available."}
            </p>
            <p className="text-green-400 text-xs mt-1">
              <span className="font-semibold">Age:</span> {user.Age}
            </p>
          </div>
        </div>

        {/* Right section: Button */}
        <div className="self-start sm:self-center">
          <button
            onClick={()=>HandleReviewRequest("accepted",reqID)}
            className="mx-2 px-4 py-1 bg-green-600 hover:bg-green-700 text-[#0f1115] rounded-md text-sm font-semibold transition-all duration-200"
          >
            Accepted
          </button>

          <button
          onClick={()=>HandleReviewRequest("rejected",reqID)}
            className="mx-2 px-4 py-1 bg-green-600 hover:bg-green-700 text-[#0f1115] rounded-md text-sm font-semibold transition-all duration-200"
          >
            Rejected
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
