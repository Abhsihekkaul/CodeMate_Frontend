import React, { useEffect } from 'react';
import Navbar from './Navbar';
import { Outlet, useNavigate } from 'react-router';
import Footer from './Footer';
import { useDispatch, useSelector } from 'react-redux';
import { addUsers } from '../utils/UserSlice';
import axios from 'axios'; // ✅ Make sure this is imported
import { BaseURL } from '../utils/Constant';

const Body = () => {
  const UserData = useSelector((store) => store.user);
  // console.log(UserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (UserData && Object.keys(UserData).length !== 0) return;

    try {
      const res = await axios.get(BaseURL + "/Profile/View", {
        withCredentials: true, 
      });

      dispatch(addUsers(res.data));
    } catch (err) {
      console.log("Error:", err.message);

      // ✅ Check error status correctly
      // if (err.response && err.response.status === 500) {
        navigate("/login");
      // } else {
      //   console.error("Unexpected error:", err);
      // }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='min-h-[75vh]'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
