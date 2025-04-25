import { GetTasks } from "@/utils/actions";
import CreateTaskForm from "./CreateTaskForm";
import Link from "next/link";

type Props = {
  create: boolean;
};
// Component that displays all tasks associated with the logged in user
function getTaskStatus(status: string) {
  switch (status) {
    case "pending":
      return "Pending";
    case "progress":
      return "In Progress";
    case "complete":
      return "Completed";
    default:
      return "Invalid value";
  }
}

// Component that displays all tasks associated with the logged in user
export default async function DisplayAllTasks({ create }: Props) {
  const tasks: Task[] | number = await GetTasks();
  const userId: number = typeof tasks != "number" ? tasks[0].user_id : tasks;
  console.log("userId being returned by tasks is: ", userId);
  console.log(
    "value of create param is: ",
    create,
    "and the type is: ",
    typeof create
  );

  return (
    <>
      {create ? (
        <CreateTaskForm userId={userId} />
      ) : (
        <Link href="tasks?create=true">Create New Task</Link>
      )}
      <h2>My Tasks</h2>
      {typeof tasks != "number" ? (
        <div>
          {tasks.map((task: Task) => {
            return (
              <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <span>Status:</span> {getTaskStatus(task.status)}
                </p>
                <p>
                  <span>Due:</span> {task.due.toUTCString()}
                </p>
                <Link href={`/tasks/${task.id}`}>
                  <button className="hover:cursor-pointer">View/Update</button>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        "No tasks yet I'm afraid! Please add a task via the link above."
      )}
    </>
  );
}
