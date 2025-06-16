import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router';

const Profile = () => {
  const user = useSelector((store) => store.user);
  const { firstName, lastName, About, Age, PhotoURL, Email, Skills } = user?.[0] || {};

  const skillsToRender = Skills?.length > 0 ? Skills : ['No skills added'];

  return (
    <div className="min-h-screen flex flex-row justify-center items-center bg-[#0f1115] font-mono px-4 py-10 text-green-400 relative overflow-hidden">

      {/* Glowing Animation Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-tr from-green-800/10 via-transparent to-green-900/10 animate-pulse blur-3xl opacity-30"></div>
      </div>

      {/* Profile Container */}
      <div className="w-full max-w-3xl z-10">
        <div className="flex flex-col items-center gap-8">

          {/* Profile Image */}
          <img
            src={PhotoURL || 'https://pbs.twimg.com/profile_images/1757566183317106688/efsQFl4Q_400x400.jpg'}
            alt={`${firstName} ${lastName}`}
            className="h-[50vh] w-[50vh] object-cover rounded-lg border-4 border-green-700 shadow-lg shadow-green-900/40"
          />

          {/* Info Fields with staggered animation */}
          <div className="w-full flex flex-col gap-6 animate-fade-in">

            {/* Name */}
            <div className="flex flex-col">
              <label className="text-green-500 text-sm mb-1">FULL NAME</label>
              <div className="bg-[#1a1d21] px-4 py-2 rounded-sm text-green-300 tracking-wide shadow-inner shadow-green-800/20">
                {firstName} {lastName}
              </div>
            </div>

            {/* About */}
            <div className="flex flex-col animate-delay-1">
              <label className="text-green-500 text-sm mb-1">ABOUT</label>
              <div className="bg-[#1a1d21] px-4 py-2 rounded-sm text-green-300 italic shadow-inner shadow-green-800/20">
                {About || 'No bio available'}
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col animate-delay-2">
              <label className="text-green-500 text-sm mb-1">EMAIL</label>
              <div className="bg-[#1a1d21] px-4 py-2 rounded-sm text-green-300 shadow-inner shadow-green-800/20 break-words">
                {Email || 'Not provided'}
              </div>
            </div>

            {/* Age */}
            <div className="flex flex-col animate-delay-3">
              <label className="text-green-500 text-sm mb-1">AGE</label>
              <div className="bg-[#1a1d21] px-4 py-2 rounded-sm text-green-300 shadow-inner shadow-green-800/20">
                {Age || 'Unknown'}
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col animate-delay-4">
              <label className="text-green-500 text-sm mb-1">SKILLS</label>
              <div className="bg-[#1a1d21] px-4 py-2 rounded-sm text-green-300 shadow-inner shadow-green-800/20">
                <ul className="list-disc list-inside">
                  {skillsToRender.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Edit Profile Button */}
            <Link
              to="/Profile/edit"
              className="mt-6 text-center bg-green-600 hover:bg-green-500 text-[#0f1115] font-bold py-2 px-6 rounded-sm transition-all duration-200 tracking-wider shadow-md hover:shadow-green-500/20"
            >
              EDIT PROFILE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
