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
      <div className="flex justify-between">
        <h2 className="text-5xl font-semibold">My Tasks</h2>
        <Link href="/createtask" className="justify-right">
          <Button typeName="normal">Create New Task</Button>
        </Link>
      </div>
      {typeof tasks != "number" ? (
        <table className="table-fixed w-full mt-12">
          <thead>
            <tr className="text-2xl text-left align-text-top tracking-wider">
              <th className="w-64">Title</th>
              <th>Description</th>
              <th className="w-32">Status</th>
              <th className="w-64">Due</th>
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody className="text-left align-text-top">
            {tasks.map((task: Task) => {
              return <Task key={task.id} task={task} />;
            })}
          </tbody>
        </table>
      ) : (
        "No tasks yet I'm afraid! Please add a task via the link above."
      )}
    </>
  );
}
