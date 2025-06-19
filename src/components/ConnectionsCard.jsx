import axios from 'axios';
import React from 'react';
import { BaseURL } from '../utils/Constant';
const ConnectionCard = ({ data }) => {
  const getRequestIDandRemove = async (id) => {
    try{
        const fetchID = await axios.get(`${BaseURL}/connection/accepted/${id}`, {withCredentials : true});
        if(!fetchID) return;
        console.log(fetchID?.data?.connectionId);
        const ID =  fetchID?.data?.connectionId;
        handleConnectionRemoval(ID);
    }catch(err){
      console.log(err);
    }
  }
  const handleConnectionRemoval = async (id) => {
    try{
      if(!id) return;
      const res = await axios.delete(`${BaseURL}/connections/delete/${id}`, {withCredentials:true});
      console.log(res);
      window.location.reload();
    }catch(err){
      console.log(err);
    }
  }
  return (
    <div className="bg-[#0f1115] border border-green-600 rounded-lg p-4 w-full max-w-full shadow-md shadow-green-500/10 mb-6 my-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left section: Profile info */}
        <div className="flex items-center gap-4">
          <img
            src={data.PhotoURL}
            alt="User"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-green-500 object-cover"
          />
          <div>
            <h2 className="text-lg sm:text-xl text-green-400 font-semibold tracking-wide">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-green-300 text-sm sm:text-base">
              {data.About || "No bio available."}
            </p>
            <p className="text-green-400 text-xs mt-1">
              <span className="font-semibold">Age:</span> {data.Age}
            </p>
          </div>
        </div>

        {/* Right section: Button */}
        <div className="self-start sm:self-center">
          <button onClick={()=>getRequestIDandRemove(data._id)} className="px-4 py-1 bg-green-600 hover:bg-green-700 text-[#0f1115] rounded-md text-sm font-semibold transition-all duration-200">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionCard;
