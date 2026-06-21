const API_URL = import.meta.env.VITE_API_URL;

export async function getTasks() {
  const response = await fetch(`${API_URL}/api/tasks`);

  if (!response.ok) {
    throw new Error("Unable to retrieve tasks.");
  }

  return response.json();
}
