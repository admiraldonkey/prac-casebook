import { GetTasks } from "@/utils/actions";
import CreateTaskForm from "./CreateTaskForm";
import Link from "next/link";
import Button from "./Button";
import Task from "./Task";

type Props = {
  create: boolean;
};

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
      {/* {create ? (
        <CreateTaskForm userId={userId} />
      ) : (
        <Link href="tasks?create=true">
          <Button typeName="normal">Create New Task</Button>
        </Link>
      )} */}
      <div className="flex justify-between">
        <h2 className="pl-4 text-3xl font-semibold">My Tasks</h2>
        <Link href="tasks/create" className="justify-right">
          <Button typeName="normal">Create New Task</Button>
        </Link>
      </div>
      {typeof tasks != "number" ? (
        <div>
          {tasks.map((task: Task) => {
            return <Task key={task.id} task={task} />;
          })}
        </div>
      ) : (
        "No tasks yet I'm afraid! Please add a task via the link above."
      )}
    </>
  );
}
