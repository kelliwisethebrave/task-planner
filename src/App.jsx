import { useEffect, useState } from "react";
import TaskList from "./features/tasks/TaskList.jsx";
import { getTasks } from "./services/tasksApi.js";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadTasks() {
      try {
        setError("");

        const taskData = await getTasks();

        setTasks(taskData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold text-slate-900">Task Planner</h1>

      {isLoading && <p>Loading tasks...</p>}

      {error && <p role="alert">{error}</p>}

      {!isLoading && !error && <TaskList tasks={tasks} />}
    </main>
  );
}

export default App;
