import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { revalidatePath } from "next/cache";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";

async function handleAddTask(formData: FormData) {
  "use server";
  const taskObj = Object.fromEntries(formData.entries());
  const { title, description, status, due, id } = taskObj;
  console.log("Test task creation: ", title, status, due, id);
  await db.query(
    `INSERT INTO tasks
    (title, description, status, due, user_id)
    VALUES
    ($1, $2, $3, $4, $5)`,
    [title, description, status, due, id]
  );
  revalidatePath("/tasks");
}

async function handleUpdateTask(formData: FormData) {
  "use server";
  const taskObj = Object.fromEntries(formData.entries());
  const { title, description, status, due, id } = taskObj;
  console.log("Test task update: ", title, description, status, due, id);
  await db.query(
    `UPDATE tasks
    SET title = $1, description = $2, status = $3, due = $4 WHERE id = $5`,
    [title, description, status, due, id]
  );
  revalidatePath(`/tasks/${id}`);
  redirect(`/tasks`);
}

// Removes trailing 'Z' character from toISOString Date method so it can be used as the default value for the date input.
function TrimDate(date: Date) {
  let str = date.toISOString();
  str = str.slice(0, -1);
  return str;
}

// Component that renders the form for a logged in user to create a new task
export default function CreateTaskForm({
  userId,
  task,
}: {
  userId?: number;
  task?: Task;
}) {
  return (
    <div className="flex flex-col">
      <Form.Root
        action={task ? handleUpdateTask : handleAddTask}
        className="border rounded-xl"
      >
        <Form.Field name="title">
          <Form.Label>Title</Form.Label>
          <Form.Control asChild>
            <input defaultValue={task && task.title} required />
          </Form.Control>
          <Form.Message match="valueMissing">
            Please enter a task title
          </Form.Message>
        </Form.Field>
        <Form.Field name="description">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control asChild>
            <textarea defaultValue={task && task.description} rows={10} />
          </Form.Control>
        </Form.Field>
        <Form.Field name="status">
          <Form.Label>Status</Form.Label>
          <Form.Control asChild>
            <select defaultValue={task && task.status} required>
              <option value="">--Select Task Status--</option>
              <option value="pending">Pending</option>
              <option value="progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </Form.Control>
          <Form.Message match="valueMissing">
            Please select current task status
          </Form.Message>
        </Form.Field>
        <Form.Field name="due">
          <Form.Label>Due</Form.Label>
          <Form.Control asChild>
            <input
              type="datetime-local"
              max="2038-01-19T03:14:07.49"
              defaultValue={task && TrimDate(task.due)}
              required
            />
          </Form.Control>
          <Form.Message match="valueMissing">
            Please select a due date
          </Form.Message>
        </Form.Field>
        <Form.Field name="id">
          <Form.Control asChild>
            <input type="hidden" defaultValue={userId ? userId : task?.id} />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="hover:cursor-pointer">
            {task ? "Update" : "Create"} Task
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
