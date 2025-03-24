import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function ProfileEdit() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "basicinfo", label: "Basic Info" },
    { path: "socials", label: "Socials" },
    { path: "platform", label: "Platform" },
    { path: "accounts", label: "Accounts" }
  ];

  return (
    <div className='pt-20 flex flex-row'>
      <div className="bg-white dark:bg-darkBox-900 border p-4 rounded-lg lg:min-w-[300px]">
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </button>
        <div className={`flex-col w-full gap-2 lg:flex ${isOpen ? 'flex' : 'hidden'}`}>
          {menuItems.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="text-gray-500 flex font-medium border-b p-3 hover:text-black hover:bg-gray-50 transition rounded-lg"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default ProfileEdit;