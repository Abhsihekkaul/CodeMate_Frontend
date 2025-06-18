import React, { useEffect } from 'react';
import { BaseURL } from '../utils/Constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/FeedSlice';
import FeedCard from './FeedCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.Feed);

  const fetchFeed = async () => {
    try {
      if (feedData.length > 0) return;
      const res = await axios.get(BaseURL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
      console.log("Feed data fetched:", res?.data?.data);
    } catch (err) {
      console.error("Feed fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div>
      <h2>Hello world I am feed</h2>
      {
        feedData.map((eachProfile, index) => (
          <FeedCard key={index} profile={eachProfile} />
        ))
      }
    </div>
  );
};

export default Feed;
