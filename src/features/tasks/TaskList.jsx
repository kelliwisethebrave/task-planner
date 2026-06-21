function formatDueDate(dueDate) {
  const [year, month, day] = dueDate.slice(0, 10).split("-");
  return `${month}/${day}/${year}`;
}

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>You do not have any tasks yet.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h2>{task.name}</h2>
          {task.description && <p>{task.description}</p>}
          <p>Due: {formatDueDate(task.dueDate)}</p>
          {task.category && <p>Category: {task.category}</p>}
          <p>Status: {task.isCompleted ? "Completed" : "Not completed"}</p>
          --------
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
