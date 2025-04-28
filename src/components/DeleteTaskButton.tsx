"use client";

import { DeleteTask } from "@/utils/actions";
import Button from "./Button";
import { redirect } from "next/navigation";

type Props = {
  taskId: number;
};

// Runs upon user clicking the delete button. User is prompted for confirmation before calling the DeleteTask function and redirecting to the main tasks page
function handleDeleteTask(taskId: number) {
  const confirmed = confirm("Are you sure you wish to delete this task?");
  if (confirmed) {
    DeleteTask(taskId);
    redirect(`/tasks`);
  }
}

// Renders a delete button for deleting a task. Seperate component as the event listener requires client-side rendering. This way means only the component is client rendered while the rest of the page can maintain server-side rendering.
export default function DeleteTaskButton({ taskId }: Props) {
  return (
    <Button
      typeName="delete"
      onClick={() => {
        handleDeleteTask(taskId);
      }}
    >
      Delete Task
    </Button>
  );
}
