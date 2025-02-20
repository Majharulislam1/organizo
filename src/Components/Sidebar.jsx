import { useState } from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Hamburger Button (for Mobile) */}
      <button
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`bg-[#111827] h-screen p-5 pt-8 text-white fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out 
          ${isOpen ? "w-64" : "w-0"} md:w-64`}
      >
        <h1 className={`text-2xl font-semibold mb-6 transition-all ${isOpen ? "block" : "hidden"}`}>
          CRM HUB
        </h1>

        <ul className="space-y-6">
          <SidebarItem icon={FiHome} text="Home" isOpen={isOpen} />
          <SidebarItem icon={FiUsers} text="Accounts" isOpen={isOpen} />
          <SidebarItem icon={FiSettings} text="Settings" isOpen={isOpen} />
          <SidebarItem icon={FiLogOut} text="Logout" isOpen={isOpen} />
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 md:ml-64">
        <h2 className="text-xl font-bold">Dashboard Content</h2>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, text, isOpen }) => {
  return (
    <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700">
      <Icon className="text-xl" />
      <span className={`${isOpen ? "block" : "hidden"} transition-all`}>{text}</span>
    </li>
  );
};

export default Sidebar;
