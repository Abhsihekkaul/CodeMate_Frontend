import axios from 'axios';
import React, { useEffect } from 'react';
import { BaseURL } from '../utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/ConnectionSlice';
import ConnectionsCard from './ConnectionsCard';

const Connections = () => {
  const ConnectionsFeed = useSelector((store) => store.Connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (ConnectionsFeed.length > 0) return;

    try {
      const res = await axios.get(`${BaseURL}/user/connections`, {
        withCredentials: true,
      });

      dispatch(addConnections(res.data));
      //console.log(res.data);
    } catch (err) {
      console.log("Error fetching connections:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  return (
    <div>
      {ConnectionsFeed?.data && ConnectionsFeed?.data.length > 0 ? (
        ConnectionsFeed?.data.map((connection) => (
          <ConnectionsCard key={connection._id} data={connection}/>
        ))
      ) : (
        <h1>No connection requests found</h1>
      )}
    </div>
  );
};

export default Connections;
