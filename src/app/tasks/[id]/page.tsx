import DisplayTask from "@/components/DisplayTask";
import { GetTask } from "@/utils/actions";

export default async function IndividualTaskPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { edit: string | undefined };
}) {
  const taskId = (await params).id;
  // console.log("taskId from inditaskpage is: ", taskId);
  const editTask = (await searchParams).edit === "true";
  console.log("search param variable type is: ", editTask);
  const task: Task = await GetTask(parseInt(taskId));

  return (
    <>
      <DisplayTask {...task} editTask={editTask} />
    </>
  );
}
