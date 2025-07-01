// src/components/Request.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseURL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { setReceivedRequests } from '../utils/RequestSlice';
import RequestCard from './RequestCard';

const Request = () => {
  const dispatch = useDispatch();
  const [RequestFeed, setReceivedRequests] = useState(useSelector((store) => store.Request.received));
  const [Error, setError] = useState(" ");

  const fetchRequests = async () => {
    if (RequestFeed.length > 0) return;

    try {
      const res = await axios.get(`${BaseURL}/user/request/received`, {
        withCredentials: true,
      });
      dispatch(setReceivedRequests(res?.data?.data));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      {RequestFeed && RequestFeed.length > 0 ? (
        RequestFeed.map((request) => (
          <RequestCard key={request._id} data={request} reqID={request._id} />
        ))
      ) : (
        <h1 className="text-green-400 text-center text-lg mt-10">No Request Found!</h1>
      )}
    </div>
  );
};

export default Request;
