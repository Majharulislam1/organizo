import { useContext, useState } from "react";
import { FiHome, FiUsers, FiSettings, FiLogOut, FiMenu, FiX, FiPlus } from "react-icons/fi";
import { AuthContext } from "./Authentication";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import TaskBoard from "./TaskBoard";
 
 
 

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    let [modalOpen, setModalOpen] = useState(false)
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    
   

    const handleAddTask = (e) => {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    const task = { title, description, time_stamp: new Date(), category, email: user?.email };

    axiosPublic.post('/add_task', task)
        .then(res => {
            if (res.data.insertedId) {
            
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Successfully Added Task",
                    showConfirmButton: false,
                    timer: 2000
                });

                setModalOpen(false);
            
            }
        })
        
};

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

                            <button onClick={() => setModalOpen(!modalOpen)} className="bg-primary flex cursor-pointer items-center justify-between px-4 py-2 rounded-full text-black ">
                                <FiPlus className="text-lg mr-1 " /> Add Task
                            </button>
                        </div>
                    </div>
                </div>

                {/* modal  */}

                <div>
                    <div className="flex flex-col absolute items-center justify-center h-screen">
                        {modalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-[#0000002e]  bg-opacity-50">
                                <div className="bg-white p-6 rounded-lg shadow-lg lg:w-2/5 md:w-2/5 sm:4/5">
                                    <h3 className="font-bold text-lg text-center my-2">Add Task</h3>

                                    <form onSubmit={handleAddTask}>
                                        <div className="grid grid-cols-6 gap-6">

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="title" className="text-sm font-medium text-gray-900 block mb-2">Title:</label>
                                                <input type="text" name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="post tile" required="" />
                                            </div>


                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                                                    Category
                                                </label>
                                                 
                                                <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 ">
                                                    <option value={''} disabled>Select Category</option>
                                                    <option value="TODO">To Do</option>
                                                </select>
                                            </div>


                                            <div className="col-span-full">
                                                <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description:</label>
                                                <textarea name="description" id="description" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Description"></textarea>
                                            </div>

                                        </div>
                                        <div className="p-6 border-t border-gray-200 rounded-b">
                                            <button className="text-black bg-primary  cursor-pointer  font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="submit">Submit</button>
                                        </div>
                                    </form>


                                    <button className="btn mt-4 bg-primary text-black px-4 py-1 cursor-pointer rounded-full" onClick={() => setModalOpen(false)}>Close</button>
                                </div>
                            </div>
                        )}
                    </div>


                </div>


                {/* task category  */}
                <div>

                    <TaskBoard></TaskBoard>
                </div>







            </div>


        </div>
    );
};



export default Sidebar;
