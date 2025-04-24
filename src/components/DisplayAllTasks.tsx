import { GetTasks } from "@/utils/actions";
// Component that displays all tasks associated with the logged in user
type Task = {
  id: number;
  title: string;
  description?: string;
  status: string;
  due: Date;
};
export default async function DisplayAllTasks() {
  //   const tasks = (await db.query()).rows;
  const tasks: Task[] | null = await GetTasks();

  return (
    <>
      <h2>Tasks go here</h2>
      {tasks ? (
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
              </div>
            );
          })}
        </div>
      ) : (
        "No tasks yet I'm afraid! Please add a task via the link below."
      )}
    </>
  );
}
