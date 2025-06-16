import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BaseURL } from '../utils/Constant';
import { addUsers } from '../utils/UserSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const user = useSelector((store) => store.user?.[0]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    Age: user?.Age || '',
    About: user?.About || '',
    PhotoURL: user?.PhotoURL || '',
    Skills: user?.Skills?.join(', ') || '', // stringified
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.put(BaseURL + "/Profile/edit", {
        ...form,
        Skills: form.Skills.split(',').map((skill) => skill.trim()),
      }, {
        withCredentials: true,
      });

      dispatch(addUsers([res.data]));
      console.log(res.data);
      toast.success('✅ Profile updated successfully!', {
        position: 'top-right',
        autoClose: 3000,
        className: 'bg-green-800 text-white font-mono border border-green-600',
      });

      setTimeout(() => navigate('/profile'), 2000);
    } catch (err) {
      toast.error(`❌ ${err?.response?.data?.error || 'Something went wrong.'}`, {
        position: 'top-right',
        autoClose: 3000,
        className: 'bg-red-800 text-white font-mono border border-red-600',
      });
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0f1115] text-green-400 font-mono px-4 py-10 relative overflow-hidden">

      {/* Animated green effect */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-green-800/10 via-transparent to-green-900/10 animate-pulse blur-2xl opacity-30"></div>
      </div>

      <div className="z-10 w-full max-w-2xl bg-[#1A1D21] p-8 rounded-lg shadow-xl border border-green-700">
        <h2 className="text-4xl text-center mb-8 tracking-widest font-bold">EDIT PROFILE</h2>

        <div className="flex flex-col gap-6">
          {[
            { name: 'firstName', label: 'First Name' },
            { name: 'lastName', label: 'Last Name' },
            { name: 'Age', label: 'Age' },
            { name: 'PhotoURL', label: 'Profile Image URL' },
            { name: 'About', label: 'About' },
            { name: 'Skills', label: 'Skills (comma-separated)' },
          ].map(({ name, label }) => (
            <div key={name}>
              <label className="text-green-500 text-sm mb-1 block tracking-widest">{label}</label>
              <input
                type="text"
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Enter ${label}`}
                className="w-full px-4 py-2 bg-[#111418] text-green-300 border border-green-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-green-700 transition-all duration-150"
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 hover:bg-green-500 text-[#0f1115] font-bold py-2 rounded-sm transition-all duration-200 tracking-widest shadow-md hover:shadow-green-500/20"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditProfile;
