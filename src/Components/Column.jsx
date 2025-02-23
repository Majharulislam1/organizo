import { useDrop } from 'react-dnd';
import { ItemTypes } from "./ItemTypes";
import TaskCard from "./TaskCard";

const Column = ({ column, tasks, deleteTask, handleDrop, updateTask, handleEditTask }) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TASK,
    drop: (item) => handleDrop(item, column.id), // Drop handler that moves task to this column
  });

  return (
   
      <div ref={drop} className="bg-gray-100 p-4 rounded-lg lg:w-1/3 md:w-1/3 sm:w-full">
        <h2 className="text-xl font-semibold mb-4 text-center">{column.title}</h2>
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} deleteTask={deleteTask} updateTask={updateTask} handleEditTask={handleEditTask} />
        ))}
       
    </div>
  );
};

export default Column;
