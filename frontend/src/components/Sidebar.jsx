// src/components/Sidebar.jsx

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="h-screen w-1/5 bg-white shadow-md flex flex-col justify-between">
      {/* Üst Logo ve Menü Alanı */}
      <div>
        <div className="p-4 text-lg font-bold text-blue-500 flex items-center">
          <img src="/vite.svg" alt="Logo" className="w-8 h-8 mr-2" />
          ARD-LOGO
        </div>
        <ul className="mt-4 space-y-2">
          <li className="py-2 px-4 hover:bg-blue-100 cursor-pointer">
            <Link to="/basvurular" className="block w-full h-full text-gray-700 hover:text-black">Başvurular</Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-100 cursor-pointer">
            <Link to="/avukatlar" className="block w-full h-full text-gray-700 hover:text-black">Avukatlar</Link>
          </li>
          <li className="py-2 px-4 hover:bg-blue-100 cursor-pointer">
            <Link to="/davalar" className="block w-full h-full text-gray-700 hover:text-black">Davalar</Link>
          </li>
        </ul>
      </div>

      {/* Alt Menü */}
      <div className="p-4">
        <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
