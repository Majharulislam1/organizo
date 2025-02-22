import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from '@tanstack/react-query';
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./ItemTypes";  
import Column from "./Column";  
import { AuthContext } from "./Authentication";  
import useAxiosPublic from "../Hooks/useAxiosPublic";  
import { HTML5Backend } from "react-dnd-html5-backend";

const COLUMNS = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  
 
  const { isLoading, data: fetchedTasks = [], refetch } = useQuery({
    queryKey: ['All_Tasks', user?.email], 
    queryFn: async () => {
      if (!user?.email) return [];
      const res = await axiosPublic.get(`/task/${user?.email}`);
      return setTasks(res.data);  
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

 
  const deleteTask = useMutation({
    mutationFn: async (taskId) => {
      await axiosPublic.delete(`/task/${taskId}`);
    },
    onSuccess: () => {
      refetch();
    },
  });

  
  const handleDrop = (item, monitor) => {
    const taskId = item.id;
    const newCategory = monitor.getDropResult().id;
    
   
    if (newCategory === item.category) {
      const reorderedTasks = tasks.map((task) => 
        task._id === taskId ? { ...task, category: newCategory } : task
      );
      setTasks(reorderedTasks);
      
   
      const updatedTask = reorderedTasks.find((task) => task._id === taskId);
      updateTaskCategory.mutate(updatedTask);
    } else {
    
      const updatedTasks = tasks.map((task) => 
        task._id === taskId ? { ...task, category: newCategory } : task
      );
      setTasks(updatedTasks);

      const updatedTask = updatedTasks.find((task) => task._id === taskId);
      updateTaskCategory.mutate(updatedTask);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4">
        <div className="flex gap-8">
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.category === column.id)}  
              deleteTask={deleteTask.mutate}   
              handleDrop={handleDrop}          
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
