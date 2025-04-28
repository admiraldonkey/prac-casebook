import { GetTasks } from "@/utils/actions";
import Link from "next/link";
import Button from "./Button";
import Task from "./Task/Task";

// Component that displays all tasks associated with the logged in user
export default async function DisplayAllTasks() {
  const tasks: Task[] | number = await GetTasks();
  const userId: number = typeof tasks != "number" ? tasks[0].user_id : tasks;
  console.log("userId being returned by tasks is: ", userId);

  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-5xl font-semibold">My Tasks</h2>
        <Link href="/createtask" className="justify-right">
          <Button typeName="normal">Create New Task</Button>
        </Link>
      </div>
      {/* Checks if tasks exist in 'tasks' variable, if so renders a table for displaying them on the page */}
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
            {/* Maps through each task in the array and passes its data to the rendered Task component, adding a new row to the table */}
            {tasks.map((task: Task) => {
              return <Task key={task.id} task={task} />;
            })}
          </tbody>
        </table>
      ) : (
        "No current tasks. Please add a task via the button above."
      )}
    </>
  );
}
