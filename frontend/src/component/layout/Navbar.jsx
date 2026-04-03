import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className='flex gap-5 bg-white border-b border-gray-200 py-4 px-7 sticky top-0 z-50'>
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? <HiOutlineX className='text-2xl' /> : <HiOutlineMenu className='text-2xl' />}
      </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[64px] left-0 w-64 h-full bg-white shadow-md z-50 lg:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
      <div className="fixed top-[64px] left-0 w-64 h-full bg-white shadow-md z-50 lg:block hidden">
          <SideMenu activeMenu={activeMenu} />
      </div>
      
    </div>
  );
};

export default Navbar;
