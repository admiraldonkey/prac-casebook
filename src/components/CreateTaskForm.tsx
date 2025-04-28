import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { revalidatePath } from "next/cache";
import { db } from "@/utils/db";
import { redirect } from "next/navigation";
import Button from "./Button";
import Link from "next/link";

// Server action that handles the form submission and adds the task to the database.
async function handleAddTask(formData: FormData) {
  "use server";
  try {
    const taskObj = Object.fromEntries(formData.entries());
    const { title, description, status, due, id } = taskObj;
    await db.query(
      `INSERT INTO tasks
    (title, description, status, due, user_id)
    VALUES
    ($1, $2, $3, $4, $5)`,
      [title, description, status, due, id]
    );
  } catch (error) {
    console.error("Failed to add task to database: ", error);
  }
  // Returns user to the main tasks page
  revalidatePath("/tasks");
  redirect(`/tasks`);
}

// Server action that handles the form submission to update an existing task in the database.
async function handleUpdateTask(formData: FormData) {
  "use server";
  try {
    const taskObj = Object.fromEntries(formData.entries());
    const { title, description, status, due, id } = taskObj;
    await db.query(
      `UPDATE tasks
    SET title = $1, description = $2, status = $3, due = $4 WHERE id = $5`,
      [title, description, status, due, id]
    );
    revalidatePath(`/tasks/${id}`);
  } catch (error) {
    console.error("Task failed to update: ", error);
  }
  // Returns user to the main tasks page
  redirect(`/tasks`);
}

// Removes trailing 'Z' character from toISOString Date method so it can be used as the default value for the date input.
function TrimDate(date: Date) {
  try {
    let str = date.toISOString();
    str = str.slice(0, -1);
    return str;
  } catch (error) {
    console.error("Failed to convert date to ISO string: ", error);
    return "YYYY-MM-DDTHH:mm";
  }
}

// Component that renders the form for a logged in user to create a new task.
// Uses a RadixUI form primitive for inbuilt accessibility and validation control.
export default function CreateTaskForm({
  userId,
  task,
}: {
  userId?: number;
  task?: Task;
}) {
  return (
    <div className="flex flex-col items-center">
      <Form.Root
        // Conditionally set the form action depending on whether a task was passed as a prop (and therefore either creating a new task or updating an existing task)
        action={task ? handleUpdateTask : handleAddTask}
        className="w-[800px]"
      >
        <Form.Field name="title" className="mb-2.5 grid">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-3xl font-semibold leading-tight pb-2">
              Title
            </Form.Label>
            <Form.Message match="valueMissing" className="px-4 text-darkred">
              Please enter a task title
            </Form.Message>
            <Form.Message match="tooShort" className="px-4 text-darkred">
              Minimum of 3 characters
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="px-3 py-1 text-lg box-border border-2 border-govblack w-full rounded inline-flex items-center justify-center"
              defaultValue={task && task.title}
              minLength={3}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="description" className="mb-2.5 grid">
          <Form.Label className="text-3xl font-semibold leading-tight pb-2">
            Description (optional)
          </Form.Label>
          <Form.Control asChild>
            <textarea
              className="px-3 py-1 text-lg box-border border-2 border-govblack w-full rounded inline-flex items-center justify-center"
              defaultValue={task && task.description}
              rows={10}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="status" className="mb-2.5 grid">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-3xl font-semibold leading-tight pb-2">
              Status
            </Form.Label>
            <Form.Message match="valueMissing" className="px-4 text-darkred">
              Please select current task status
            </Form.Message>
          </div>
          <Form.Control asChild>
            <select
              className="px-3 py-1 text-lg box-border border-2 border-govblack w-full rounded inline-flex items-center justify-center"
              defaultValue={task && task.status}
              required
            >
              <option value="">--Select Task Status--</option>
              <option value="pending">Pending</option>
              <option value="progress">In Progress</option>
              <option value="complete">Complete</option>
            </select>
          </Form.Control>
        </Form.Field>
        <Form.Field name="due">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-3xl font-semibold leading-tight pb-2">
              Due
            </Form.Label>
            <Form.Message match="valueMissing" className="px-4 text-darkred">
              Please select a due date
            </Form.Message>
            <Form.Message match="typeMismatch" className="px-4 text-darkred">
              Invalid input
            </Form.Message>
            <Form.Message match="rangeOverflow" className="px-4 text-darkred">
              Please select an earlier date
            </Form.Message>
            <Form.Message match="rangeUnderflow" className="px-4 text-darkred">
              Selected date must not be in the past!
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="px-3 py-1 text-lg box-border border-2 border-govblack w-full rounded inline-flex"
              type="datetime-local"
              min="2025-04-28T21:25:00.00"
              max="2038-01-19T03:14:07.49"
              defaultValue={task && TrimDate(task.due)}
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field name="id">
          <Form.Control asChild>
            <input type="hidden" defaultValue={userId ? userId : task?.id} />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild className="mt-6">
          {/* Button text conditionally changes depending on if a task was passed as a prop to reflect the resulting form action upon submit  */}
          <Button typeName="submit">{task ? "Update" : "Create"} Task</Button>
        </Form.Submit>
      </Form.Root>
      <Link
        href="/tasks"
        className="text-xl hover:underline hover:underline-offset-2 pt-4"
      >
        {" < Return To Tasks"}
      </Link>
    </div>
  );
}
