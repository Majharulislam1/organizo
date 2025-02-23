import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const TaskCard = ({ task, deleteTask,updateTask,handleEditTask }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: { id: task._id, category: task.category },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="bg-white p-4 mb-2 rounded-lg shadow cursor-grab">
      <h3 className="font-medium text-black">{task.title}</h3>
      <p className="mt-2 text-sm text-black">{task.description.slice(0, 100)}</p>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => deleteTask(task._id)}
          className="text-sm px-3 py-1 bg-red-500  text-white rounded-full"
        >
          Delete
        </button>

        <button
          onClick={() => handleEditTask(task._id)}
          className="text-sm px-3 py-1 bg-primary  text-black rounded-full"
        >
          update
        </button>
      </div>


    </div>
  );
};

export default TaskCard;
