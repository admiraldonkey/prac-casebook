import * as React from "react";
import * as Form from "@radix-ui/react-form";
import { revalidatePath } from "next/cache";
import { db } from "@/utils/db";

async function handleAddTask(formData: FormData) {
  "use server";
  const taskObj = Object.fromEntries(formData.entries());
  const { title, description, status, due, userId } = taskObj;
  console.log("Test task creation: ", title, status, due, userId);
  await db.query(
    `INSERT INTO tasks
    (title, description, status, due, user_id)
    VALUES
    ($1, $2, $3, $4, $5)`,
    [title, description, status, due, userId]
  );
  revalidatePath("/tasks");
}

// Component that renders the form for a logged in user to create a new task
export default function CreateTaskForm({ userId }: { userId: number }) {
  return (
    <div>
      <Form.Root action={handleAddTask}>
        <Form.Field name="title">
          <Form.Label>Title</Form.Label>
          <Form.Control asChild>
            <input required />
          </Form.Control>
          <Form.Message match="valueMissing">
            Please enter a task title
          </Form.Message>
        </Form.Field>
        <Form.Field name="description">
          <Form.Label>Description (optional)</Form.Label>
          <Form.Control asChild>
            <textarea rows={10} />
          </Form.Control>
        </Form.Field>
        <Form.Field name="status">
          <Form.Label>Status</Form.Label>
          <Form.Control asChild>
            <select required>
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
            <input type="datetime-local" required />
          </Form.Control>
          <Form.Message match="valueMissing">
            Please select a due date
          </Form.Message>
        </Form.Field>
        <Form.Field name="userId">
          <Form.Control asChild>
            <input type="hidden" defaultValue={userId} />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button>Create Task</button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
