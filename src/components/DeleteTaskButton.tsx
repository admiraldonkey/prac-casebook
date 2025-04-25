"use client";

import { DeleteTask } from "@/utils/actions";

type Props = {
  taskId: number;
};

function handleDeleteTask(taskId: number) {
  DeleteTask(taskId);
}

export default function DeleteTaskButton({ taskId }: Props) {
  return (
    <button
      className="hover:cursor-pointer"
      onClick={() => {
        handleDeleteTask(taskId);
      }}
    >
      Delete Task
    </button>
  );
}
