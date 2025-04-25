import CreateTaskForm from "@/components/CreateTaskForm";
import Link from "next/link";
import DeleteTaskButton from "./DeleteTaskButton";
interface TaskProps extends Task {
  editTask: boolean | undefined;
}

function handleDeleteTask() {
  console.log("task deletion attempt...");
}
// Component that displays information on a specific task
export default function DisplayTask(task: TaskProps) {
  const taskId = task.id;
  return (
    <>
      <h2>This is the page for viewing details of a specific task</h2>
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <p>
          <span>Status:</span> {task.status}
        </p>
        <p>
          <span>Due:</span> {task.due.toUTCString()}
        </p>
        <Link href={`/tasks/${task.id}?edit=true`}>Edit Task</Link>
        {task.editTask && <CreateTaskForm task={task} />}
        <DeleteTaskButton taskId={taskId} />
      </div>
    </>
  );
}
