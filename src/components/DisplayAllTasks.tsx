import { GetTasks } from "@/utils/actions";
import Link from "next/link";
import Button from "./Button";
import Task from "./Task/Task";

// Component that displays all tasks associated with the logged in user
export default async function DisplayAllTasks() {
  const tasks: Task[] | number = await GetTasks();

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
        <div className="overflow-x-auto">
          <table className="w-full mt-12 overflow-hidden">
            <thead>
              <tr className="text-xl lg:text-2xl text-left align-text-top tracking-wider">
                <th className="w-42 lg:w-56" tabIndex={0}>
                  Title
                </th>
                <th className="w-auto" tabIndex={0}>
                  Description
                </th>
                <th className="w-28" tabIndex={0}>
                  Status
                </th>
                <th className="md:w-56" tabIndex={0}>
                  Due
                </th>
                <th className="md:w-16"></th>
              </tr>
            </thead>
            <tbody className="text-left align-text-top divide-y">
              {/* Maps through each task in the array and passes its data to the rendered Task component, adding a new row to the table */}
              {tasks.map((task: Task) => {
                return <Task key={task.id} task={task} />;
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-2xl mt-12">
          No current tasks. Please add a task via the button above.
        </p>
      )}
    </>
  );
}
