import React, { useEffect, useState } from 'react';
import { BaseURL } from '../utils/Constant';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/FeedSlice';
import FeedCard from './FeedCard';
import ChatBook from './ChatBook';

const Feed = () => {
  const dispatch = useDispatch();
  const feedData = useSelector((store) => store.Feed);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current profile index

  const fetchFeed = async () => {
    try {
      if (feedData.length > 0) return;
      const res = await axios.get(BaseURL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.error("Feed fetch error:", err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleNextCard = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-row h-screen w-full">
    {/* Chat Section (Hidden on Mobile) */}
    <div className="h-[95vh] hidden md:block w-[30%] bg-black text-green overflow-y-scroll">
      {/* Your Chat component or placeholder */}
        <ChatBook />
    </div>

    {/* Card Section (Visible always) */}
    <div className="w-full md:w-[70%] flex justify-center items-center bg-[#1D232A]">
      {feedData.length > 0 && currentIndex < feedData.length && (
        <FeedCard profile={feedData[currentIndex]} onAction={handleNextCard} />
      )}
      {currentIndex >= feedData.length && (
        <p className="text-white font-mono text-center">No more profiles.</p>
      )}
    </div>
  </div>
  );
};

export default Feed;
