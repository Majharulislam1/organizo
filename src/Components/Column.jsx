import { useDrop } from "react-dnd";
import TaskCard from "./TaskCard";  
import { ItemTypes } from "./ItemTypes";  

const Column = ({ column, tasks, deleteTask, handleDrop }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.TASK,  
    drop: (item) => handleDrop(item, { id: column.id }),  
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`w-1/3 ${isOver ? 'bg-gray-200' : 'bg-white'}`}>
      <h2 className="text-lg font-semibold mb-4">{column.title}</h2>
      <div className="space-y-4">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};

export default Column;
