import axios from 'axios';
import React, { useEffect } from 'react';
import { BaseURL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/ConnectionSlice';

const ConnectionsApi = () => {
  const ConnectionsFeed = useSelector((store) => store.Connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (ConnectionsFeed.length > 0) return; // Only fetch if empty

    try {
      const res = await axios.get(BaseURL + "/user/connections");
      dispatch(addConnections(res.data));
      console.log(res.data);
    } catch (err) {
      console.log("Error fetching connections:", err.message);
    }
  };

  useEffect(() => {
    fetchConnections(); // ✅ correct function call
  }, []);

  return (
    <div>
      Connection 
    </div>
  );
};

export default ConnectionsApi;
