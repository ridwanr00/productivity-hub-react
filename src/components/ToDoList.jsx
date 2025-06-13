import { useContext, useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import axios from "axios";
import AuthContext from "../context/AuthContext";

function ToDoList() {
  const [tasks, setTasks] = useState([]);

  const [guestTasks, setGuestTasks] = useState(() => {
    const savedTasks = localStorage.getItem("guestTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTodoText, setNewTodoText] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/tasks");
        setTasks(response.data);
      } catch (err) {
        if (err.response.status !== 401) {
          console.error("Error fetching tasks: ", err);
        }
      }
    };

    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("guestTasks", JSON.stringify(guestTasks));
    }
  }, [guestTasks, user]);

  const handleAddTask = async (event) => {
    event.preventDefault();

    if (newTodoText.trim() === "") return;

    if (user) {
      try {
        const response = await axios.post("http://localhost:4000/api/tasks", {
          text: newTodoText,
        });

        setTasks([...tasks, response.data]);

        setNewTodoText("");
      } catch (err) {
        console.error("Error adding task: ", err);
      }
    } else {
      const newTask = { id: Date.now(), text: newTodoText, isCompleted: false };
      setGuestTasks([...guestTasks, newTask]);
      setNewTodoText("")
    }
  };

  const handleDeleteTask = async (id) => {
    if (user) {
      try {
        await axios.delete(`http://localhost:4000/api/tasks/${id}`);
        setTasks(tasks.filter((task) => task._id !== id));
      } catch (err) {
        console.error("Error deleting task: ", err);
      }
    } else {
      setGuestTasks(guestTasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = async (id) => {
    if (user) {
      try {
        const taskToToggle = tasks.find((task) => task._id === id);
  
        const response = await axios.put(
          `http://localhost:4000/api/tasks/${id}`,
          { isCompleted: !taskToToggle.isCompleted }
        );
  
        setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      } catch (err) {
        console.error("Error updating task: ", err);
      }
    } else {
      setGuestTasks(guestTasks.map(task => 
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      ));
    }
  };

  const tasksToDisplay = user ? tasks : guestTasks;
  const idKey = user ? '_id' : 'id';

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">My Tasks</h2>
      <form id="to-do-list" name="to-do-list" onSubmit={handleAddTask} className="flex mb-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          className="flex-grow shadow appearance-none border rounded-l-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r-md transition duration-200"
        >
          Add
        </button>
      </form>
      <ul>
        {tasksToDisplay.length > 0 ? (
          tasksToDisplay.map((task) => (
            <ToDoItem
              key={task[idKey]}
              text={task.text}
              isCompleted={task.isCompleted}
              onDelete={() => handleDeleteTask(task[idKey])}
              onComplete={() => handleToggleComplete(task[idKey])}
            />
          ))
        ) : (
          <p className="text-gray-500 text-center">You have no tasks yet. Add one!</p>
        )}
      </ul>
    </div>
  );
}

export default ToDoList;
