import { useState } from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiPlus } from "react-icons/fi";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">

            <button
                className="md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-md"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>


            <div
                className={`bg-secondary h-screen p-5 pt-8 text-black fixed top-0 lg:left-0 md:left-0    z-40 transition-all duration-300 ease-in-out 
          ${isOpen ? "w-64 left-0" : "w-0 -left-10"} md:w-64`}
            >
                <h1 className={`text-2xl font-semibold mb-6 transition-all ${isOpen ? "block" : "hidden"}`}>
                    CRM HUB
                </h1>

                <ul className="space-y-6">

                    <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700">
                        <FiHome className="text-xl" />
                        <span>Home</span>
                        <span className={`${isOpen ? "block" : "hidden"} transition-all`}>Home</span>
                    </li>
                    <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700">
                        <FiUsers className="text-xl" />
                        <span>Accounts</span>
                        <span className={`${isOpen ? "block" : "hidden"} transition-all`}>Accounts</span>
                    </li>
                    <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700">
                        <FiSettings className="text-xl" />
                        <span>Settings</span>
                        <span className={`${isOpen ? "block" : "hidden"} transition-all`}>Settings</span>
                    </li>
                    <li className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-gray-700">
                        <FiLogOut className="text-xl" />
                        <span>LogOut</span>
                        <span className={`${isOpen ? "block" : "hidden"} transition-all`}>Logout</span>
                    </li>
                </ul>
            </div>

            {/* Main Content */}


            <div className="flex-1 p-10 md:ml-64">
                <h2 className="text-xl font-bold">Task</h2>
                <div className="flex justify-between items-center">
                    <div className="w-3/5">
                        <div className=" flex items-center">
                            <input type="text" className="w-full rounded-lg border border-gray-400 p-2" placeholder="Search ..." />
                            <button className="ml-2 rounded-lg bg-primary p-2 text-black ">Search</button>
                        </div>
                    </div>
                    <div className="w-2/5 flex justify-end">
                         <div>
                             <FiPlus  className="bg-primary text-5xl p-2 rounded-full text-black "/>
                         </div>
                    </div>
                </div> 

            </div>


        </div>
    );
};



export default Sidebar;
