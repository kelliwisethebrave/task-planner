import express from "express";
import cors from "cors";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (request, response) => {
  response.json({
    message: "Task Planner API is running",
  });
});

app.get("/api/tasks", async (request, response) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        dueDate: "asc",
      },
    });
    response.json(tasks);
  } catch (error) {
    console.error("Unable to retrieve tasks:", error);

    response.status(500).json({
      message: "Unable to retrieve tasks.",
    });
  }
});

app.post("/api/tasks", async (request, response) => {
  try {
    const { name, description, dueDate, category } = request.body;

    const newTask = await prisma.task.create({
      data: { name, description, dueDate: new Date(dueDate), category },
    });

    response.status(201).json(newTask);
  } catch (error) {
    console.error("Unable to create task:", error);

    response.status(500).json({
      message: "Unable to create task.",
    });
  }
});

app.patch("/api/tasks/:id", async (request, response) => {
  try {
    const taskId = Number.parseInt(request.params.id, 10);
    //converts string into a number
    if (Number.isNaN(taskId)) {
      return response.status(400).json({
        message: "Task ID must be a number.",
      });
    }

    const { name, description, dueDate, category, isCompleted } = request.body;
    const updatedTask = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        name,
        description,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        category,
        isCompleted,
      },
    });

    response.json(updatedTask);
  } catch (error) {
    if (error.code === "P2025") {
      return response.status(404).json({
        message: "Task not found.",
      });
    }
    console.error("Unable to update task:", error);

    response.status(500).json({
      message: "Unable to update task.",
    });
  }
});

app.delete("/api/tasks/:id", async (request, response) => {
  try {
    const taskId = Number.parseInt(request.params.id, 10);
    //converts string into a number
    if (Number.isNaN(taskId)) {
      return response.status(400).json({
        message: "Task ID must be a number.",
      });
    }

    const deletedTask = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });

    response.json(deletedTask);
  } catch (error) {
    if (error.code === "P2025") {
      return response.status(404).json({
        message: "Task not found.",
      });
    }
    console.error("Unable to delete task:", error);

    response.status(500).json({
      message: "Unable to delete task.",
    });
  }
});

export default app;
