import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";  

const TaskCard = ({ task, deleteTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,   
    item: { id: task._id, category: task.category },  
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),   
    }),
  });

  const handleDelete = () => {
    deleteTask(task._id);   
  };

  return (
    <div
      ref={drag}  
      className={`bg-white p-4 rounded-lg cursor-grab shadow-md ${isDragging ? 'opacity-50' : ''}`}
    >
      <h3 className="font-semibold">{task.title}</h3>
      <p>{task.description}</p>

      <div className="mt-4 flex justify-between">
        <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
