// src/components/Menu.jsx
import React from 'react';
import menuData from '../data/menu.json';
import MenuItem from './MenuItem';
import { useNavigate, Link } from 'react-router-dom';
function Menu() {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-white pl-6 pr-6 border-r shadow-lg border-gray-200">
      <div className="flex items-center bg-white pb-5">
        <Link to="/" className="block">
          <img src="/img/logo.png" alt="Logo" className="w-full" />
        </Link>
      </div>

      <nav className="flex flex-col space-y-2 text-black ">
        {menuData.menu.map((item) => (
          <MenuItem
            key={item.id}
            iconSrc={item.src}
            label={item.menuName}
            to={item.to}
          />
        ))}
      </nav>

      <div className="mt-10 p-1 bg-blue-50 rounded-xl text-center shadow">
      
        <img
          src="/img/Group.png"
          alt="Update Illustration"
          className="mx-auto w-40 h-50 mb-4"
        />

        
        <h2 className="text-lg font-semibold mb-2 text-gray-800">
          V2.0 is available
        </h2>

        
        <button className="px-4 py-2 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-100 transition">
          Try now
        </button>
      </div>

    </aside>
  );
}

export default Menu;
