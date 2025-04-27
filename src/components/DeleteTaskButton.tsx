"use client";

import { DeleteTask } from "@/utils/actions";
import Button from "./Button";
import { redirect } from "next/navigation";

type Props = {
  taskId: number;
};

function handleDeleteTask(taskId: number) {
  const confirmed = confirm("Are you sure you wish to delete this task?");
  if (confirmed) {
    DeleteTask(taskId);
    redirect(`/tasks`);
  }
}

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
