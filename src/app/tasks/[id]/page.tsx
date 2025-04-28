import CreateTaskForm from "@/components/CreateTaskForm";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import { GetTask } from "@/utils/actions";
import { redirect } from "next/navigation";

// Dynamic route that receives a task ID parameter and uses the associated task to set the default values of the rendered task creation form for easy editing.
export default async function IndividualTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Retrieves ID from dynamic route
  const taskId = (await params).id;
  // Retrieve associated task data from database
  const task: Task = await GetTask(parseInt(taskId));
  // Redirects if task not found
  if (!task) {
    redirect(`/tasks`);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-[800px] pb-8">
        <h2 className="font-semibold text-5xl text-center">Update Task</h2>
        <div>
          {/* Renders a delete button which requests user confirmation before proceeding to delete and redirect to main tasks page */}
          <DeleteTaskButton taskId={task.id}></DeleteTaskButton>
        </div>
      </div>
      {/* Renders the form and passes the task data for setting default values */}
      <CreateTaskForm task={task} />
    </div>
  );
}
