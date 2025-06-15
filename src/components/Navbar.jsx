import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const User = useSelector((store) => store.user);
  console.log(User);

  return (
    <div className="navbar bg-[#1D232A] text-green-400 font-mono shadow-md border-b border-green-800 px-6">
      <div className="flex-1">
        <a className="text-3xl tracking-widest font-bold hover:text-green-300 transition-all cursor-pointer">
          👨‍💻CodeMate
        </a>
      </div>

      <div className="flex items-center gap-3">
        {User && User.user ? (
            <h1>
              Hello, {User.user.firstName} {User.user.lastName}
            </h1>
          ) : (
            <h1>Hello, Please Login!</h1>
          )}


        {User && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform">
              <div className="w-10 rounded-full border border-green-500 overflow-hidden">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-[#1A1D21] border border-green-700 rounded-lg w-52 text-green-300">
              <li><a className="hover:bg-green-700/10">Profile</a></li>
              <li><a className="hover:bg-green-700/10">Settings</a></li>
              <li><a className="hover:bg-green-700/10">Logout</a></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
