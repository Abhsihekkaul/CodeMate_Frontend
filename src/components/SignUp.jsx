import axios from 'axios';
import React, { useState } from 'react';
import { BaseURL } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { addUsers } from '../utils/UserSlice';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [FirstName, setFirstName] = useState('');
  const [LastName, SetLastName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Age, setAge] = useState('');
  const [Skills, setSkills] = useState('');
  const [PhotoURL, setPhotoURL] = useState('');
  const [Error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButton = async () => {
    try {
      const res = await axios.post(
        BaseURL + '/signup',
        {
          firstName : FirstName,
          lastName : LastName,
          Age : Age,
          skills: Skills.split(',').map(skill => skill.trim()),
          PhotoURL : PhotoURL,
          Email : Email,
          Password : Password
        },
        {
          withCredentials: true,
        }
      );
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen py-10 bg-[#1D232A] text-green-400 font-mono px-4">
      <div className="border border-green-500 w-full max-w-md p-8 rounded-lg bg-[#0f1115] shadow-lg shadow-green-800/10">
        <h2 className="text-2xl text-center mb-8 tracking-widest">REGISTRATION PANEL</h2>

        <div className="mb-6">
          <label className="block text-sm mb-2">First Name:</label>
          <input
            type="text"
            placeholder="Abhishek"
            value={FirstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Last Name:</label>
          <input
            type="text"
            placeholder="Kaul"
            value={LastName}
            onChange={(e) => SetLastName(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Age:</label>
          <input
            type="number"
            placeholder="22"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Skills:</label>
          <input
            type="text"
            placeholder="JavaScript, React"
            value={Skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">PhotoURL:</label>
          <input
            type="text"
            placeholder="Link of the Profile Picture"
            value={PhotoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-2">Email:</label>
          <input
            type="email"
            placeholder="Abhishekkaul32@gmail.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm mb-2">Password:</label>
          <input
            type="password"
            placeholder="••••••••"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-[#1A1D21] text-green-300 border border-green-600 rounded-sm placeholder-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {Error && <p className='text-red-700 my-5'>{Error}</p>}

        <button
          onClick={handleButton}
          className="w-full bg-green-600 hover:bg-green-500 text-[#0f1115] font-bold py-2 rounded-sm tracking-widest shadow-md hover:shadow-green-500/20 transition-all duration-200"
        >
          ENTER
        </button>
      </div>
    </div>
  );
};

export default SignUp;
