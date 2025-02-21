import { useContext, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "./Authentication";

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const axiosPublic = useAxiosPublic();
    const {user} =useContext(AuthContext);


    useEffect(() => {
        axiosPublic.get(`/task/${user?.email}`)
            .then((res) => {

                setTasks(res.data);
            })
    }, [user]);


    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;
    
        if (!destination) return;  
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;  
    
        const updatedTasks = Array.from(tasks);
        const task = updatedTasks.find((task) => task._id === draggableId);
    
        if (!task) return;
    
       
        updatedTasks.splice(source.index, 1);
     
        updatedTasks.splice(destination.index, 0, {
            ...task,
            category: destination.droppableId,
        });
    
        setTasks(updatedTasks);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex space-x-6 p-5">
                {["To-Do", "In Progress", "Done"].map((category,index) => (
                    <Droppable droppableId={category + index} key={category} >
                        {(provided) => (
                            <div
                                className="w-1/3 bg-gray-100 p-4 rounded-md"
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <h2 className="text-lg font-semibold">{category}</h2>
                                {tasks
                                    .filter((task) => task.category === category)
                                    .map((task, index) => (
                                        <Draggable key={task._id} draggableId={task._id} index={index}>
                                            {(provided) => (
                                                <div
                                                    className="bg-white p-3 mt-2 rounded-md shadow"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <h3 className="font-bold">{task.title}</h3>
                                                    <p className="text-sm">{task.description}</p>
                                                    <span className="text-xs text-gray-500">
                                                        {new Date(task.time_stamp).toLocaleString()}
                                                    </span>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
