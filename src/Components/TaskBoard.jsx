import { useState, useContext } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { DndProvider,} from "react-dnd";
import Column from "./Column";
import { AuthContext } from "./Authentication";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { HTML5Backend } from "react-dnd-html5-backend";
import Swal from "sweetalert2";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  let [modalOpen, setModalOpen] = useState(false);

  const { isLoading, data: fetchedTasks = [], refetch } = useQuery({
    queryKey: ['All_Tasks', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/task/${user?.email}`);
      return setTasks(res.data) || [];
    },
  });

  const updateTaskCategory = useMutation({
    mutationFn: async (updatedTask) => {
      const res = await axiosPublic.put(`/task/${updatedTask._id}`, updatedTask);
      return res.data;
    },
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error('Error updating task', error);
    },
  });

  // update  task

  const [up_task, setUp_task] = useState([]);

  const updateTask = useMutation({
    mutationFn: async (updatedTask) => {
      const res = await axiosPublic.put(`/task/${updatedTask._id}`, updatedTask);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        title: "Updated!",
        text: "Task has been updated successfully.",
        icon: "success",
      });
      refetch();
      setModalOpen(false);
    },

  });


  const handleEditTask = (taskId) => {
    const taskData = tasks.find(task => task._id === taskId);

    if (taskData) {
      setUp_task(taskData);
      setModalOpen(true);
    }
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;
    const category = e.target.category.value;


    updateTask.mutate({
      _id: up_task._id,
      title: title,
      description: description,
      category: category,
      email: user?.email
    });

  };









  const deleteTask = useMutation({
    mutationFn: async (taskId) => {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      });

      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/task/${taskId}`);
        if (res) {
          Swal.fire({
            title: "Successfully Deleted!",
            text: "Task has been deleted.",
            icon: "success"
          });
        }
      }
    },
    onSuccess: () => {
      refetch();
    },
  });



   //drag and drop
  const handleDrop = (item, targetCategory) => {
    const taskId = item.id;
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, category: targetCategory } : task
    );

    setTasks(updatedTasks);

    const updatedTask = updatedTasks.find((task) => task._id === taskId);
    updateTaskCategory.mutate(updatedTask);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div >
      <DndProvider backend={HTML5Backend}>
        <div className="p-4">
          <div className="flex gap-8 sm:flex-col lg:flex-row md:flex-row lg:flex-nowrap">
            {COLUMNS.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={tasks.filter((task) => task.category === column.id)}
                deleteTask={deleteTask.mutate}
                handleDrop={handleDrop}
                updateTask={updateTask.mutate}
                handleEditTask={handleEditTask}
              />
            ))}
          </div>
        </div>
      </DndProvider>



      <div>
        <div className="flex flex-col absolute items-center justify-center h-screen">
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-[#0000002e]  bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg lg:w-2/5 md:w-2/5 sm:4/5">
                <h3 className="font-bold text-lg text-center my-2">Update Task</h3>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="title" className="text-sm font-medium text-gray-900 block mb-2">Title:</label>
                      <input type="text" defaultValue={up_task?.title} name="title" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5" placeholder="post tile" required="" />
                    </div>


                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
                        Category
                      </label>

                      <select name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5 ">
                        <option value={''} disabled>Select Category</option>
                        <option value="TODO">To Do</option>
                        <option value="IN_PROGRESS">In Progress</option>
                        <option value="DONE">Done</option>
                      </select>
                    </div>


                    <div className="col-span-full">
                      <label htmlFor="description" className="text-sm font-medium text-gray-900 block mb-2">Description:</label>
                      <textarea name="description" defaultValue={up_task?.description} id="description" rows="6" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-4" placeholder="Description"></textarea>
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


    </div>
  );
};

export default TaskBoard;
