import React from 'react';
import { useNavigate } from 'react-router-dom';
import User from './User';
import { ModeToggle } from './Theme';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-white text-[#0F0F0F] flex items-center justify-between p-4 shadow-lg border-b-2 border-red-500 dark:bg-[#0F0F0F] dark:text-white dark:border-red-500 dark:shadow-lg">
      <div className="text-xl font-bold">
        <svg width="125" height="26" viewBox="0 0 135 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 5.89409H15.3693L9.5331 36H21.8368L27.2126 5.89409H42.2511L43.4131 0H1.17165L0 5.89409Z" fill="#D41F30"></path>
          <path d="M47.2951 0L42.512 26.9438L49.9857 36H82.8746L89.1533 0H77.1198L71.8129 30.008H56.8626L54.4711 27.0927L59.1053 0H47.2951Z" fill="#D41F30"></path>
          <path d="M86.9282 36H98.7784L100.699 23.9651H130.691L131.882 17.9993H101.825L103.214 8.93625L106.724 5.82379H122.018L120.826 11.9812H132.81L134.929 0H102.156L91.6286 9.00241L86.9282 36Z" fill="#D41F30"></path>
        </svg>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <ModeToggle />
        {!localStorage.getItem("token") ?
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="bg-white text-[#0F0F0F] border-[#C0C0C0] py-2 px-4 rounded-xl border-2 font-medium shadow-sm whitespace-nowrap dark:bg-[#1F1F1F] dark:text-zinc-300 dark:border-zinc-700 dark:shadow-sm"
          >
            <span>Admin Login</span>
          </button>
          : <User />}
      </div>
    </nav>
  );
};

export default Navbar;

