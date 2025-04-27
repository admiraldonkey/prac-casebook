import CreateTaskForm from "@/components/CreateTaskForm";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import { GetTask } from "@/utils/actions";

export default async function IndividualTaskPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const taskId = (await params).id;
  const task: Task = await GetTask(parseInt(taskId));

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex justify-between w-[800px] pb-8">
        <h2 className="font-semibold text-5xl text-center">Update Task</h2>
        <div>
          <DeleteTaskButton taskId={task.id}></DeleteTaskButton>
        </div>
      </div>
      <CreateTaskForm task={task} />
    </div>
  );
}
