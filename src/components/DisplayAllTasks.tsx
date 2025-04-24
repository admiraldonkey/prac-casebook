import { GetTasks } from "@/utils/actions";
import CreateTaskForm from "./CreateTaskForm";
// Component that displays all tasks associated with the logged in user
type Task = {
  id: number;
  title: string;
  description?: string;
  status: "pending" | "progress" | "complete";
  due: Date;
  user_id: number;
};
export default async function DisplayAllTasks() {
  const tasks: Task[] | number = await GetTasks();
  const userId: number = typeof tasks != "number" ? tasks[0].user_id : tasks;
  console.log("userId being returned by tasks is: ", userId);

  return (
    <>
      <h2>Tasks go here</h2>
      {typeof tasks != "number" ? (
        <div>
          {tasks.map((task: Task) => {
            return (
              <div key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>
                  <span>Status:</span> {task.status}
                </p>
                <p>
                  <span>Due:</span> {task.due.toDateString()}
                </p>
                {/* Add link to view/edit task */}
              </div>
            );
          })}
        </div>
      ) : (
        "No tasks yet I'm afraid! Please add a task via the link below."
      )}
      <CreateTaskForm userId={userId} />
    </>
  );
}
