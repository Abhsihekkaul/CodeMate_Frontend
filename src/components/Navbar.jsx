import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BaseURL } from '../utils/Constant';
import { removeUsers } from '../utils/UserSlice';

const Navbar = () => {
  const User = useSelector((store) => store.user);
  // console.log(User);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post(BaseURL + "/logout", {}, { withCredentials: true });
      dispatch(removeUsers());
      navigate("/login");
      window.location.reload(); // 💥 Force UI refresh
  } catch (err) {
    console.log(err);
  }
};


  return (
    <div className="navbar bg-[#1D232A] text-green-400 font-mono shadow-md border-b border-green-800 px-6">
      <div className="flex-1">
        <Link to={"/"} className="text-3xl tracking-widest font-bold hover:text-green-300 transition-all cursor-pointer">
          👨‍💻CodeMate
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {User ? (
            <h1 className='hidden sm:block'>
              Hello, {User?.[0]?.firstName} {User?.[0]?.lastName}
            </h1>
          ) : (
            <h1 className='hidden sm:block'>Hello, Please Login!</h1>
          )}


        {User && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform">
              <div className="w-10 rounded-full border border-green-500 overflow-hidden">
                <img
                  alt="User Avatar"
                  src={User?.[0]?.PhotoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-[#1A1D21] border border-green-700 rounded-lg w-52 text-green-300">
              <li><Link to={"/Profile"} className="hover:bg-green-700/10">Profile</Link></li>
              <li><Link  to={"/Connections"} className="hover:bg-green-700/10">Connections</Link></li>
              <li><Link  to={"/feed"} className="hover:bg-green-700/10">Feed</Link></li>
              <li><a onClick={handleLogout} className="hover:bg-green-700/10">Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
