import axios from 'axios';
import React, { useState } from 'react';
import { BaseURL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { addUsers } from '../utils/UserSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const [Email, setEmail] = useState('Abhishek@gmail.com');
  const [Password, setPassword] = useState('Abhishek@000');
  const [Error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButton = async () => {
    try{
      const res = await axios.post(BaseURL + "/login",{
        Email,
        Password
      },
    {
      withCredentials : true,
    });
      dispatch(addUsers(res.data));
      navigate("/");
      window.location.reload();
      // console.log(res.data);
    }catch(err){

      console.log(err);
      setError(err?.response?.data?.error);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1D232A] text-green-400 font-mono px-4">
      <div className="border border-green-500 w-full max-w-md p-8 rounded-lg bg-[#0f1115] shadow-lg shadow-green-800/10">
        <h2 className="text-2xl text-center mb-8 tracking-widest">ACCESS PANEL</h2>

        <div className="mb-6">
          <label className="block text-sm mb-2">EMAIL:</label>
          <input
            type="email"
            placeholder="coder@matrix.io"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-150 placeholder-green-700"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-2">PASSWORD:</label>
          <input
            type="password"
            placeholder="••••••••"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-150 placeholder-green-700"
          />
        </div>

        <p className='text-red-700 my-5'>{Error}</p>

        <button className="w-full bg-green-600 hover:bg-green-500 text-[#0f1115] font-bold py-2 rounded-sm transition-all duration-200 tracking-widest shadow-md hover:shadow-green-500/20"
        onClick={()=>handleButton()}
        >
          ENTER
        </button>

        <button
        className="w-full bg-green-300 hover:bg-green-700 text-[#0f1115] font-bold py-2 rounded-sm transition-all duration-200 tracking-widest shadow-md hover:shadow-green-500/20 my-7"
        onClick={() => navigate('/SignUp')}
      >
        Sign Up
      </button>


        </div>
    </div>
  );
};

export default Login;
