import React from 'react';
import img from '../assets/images/images.png'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-20">

          <div className="flex-shrink-0 flex items-center">
            <img className="block lg:hidden h-8 w-auto" src={img} alt="Logo" />
            <img className="hidden lg:block h-14 w-auto" src={img} alt="Logo" />
          </div>

          <div className="flex items-center justify-center">
            <h1 className="text-xl font-bold text-gray-800">Department of Information Science and Engineering</h1>
          </div>
          <div className="flex items-center">

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
