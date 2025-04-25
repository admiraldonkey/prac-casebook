import DisplayAllTasks from "@/components/DisplayAllTasks";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: { create: string | undefined };
}) {
  const create = (await searchParams).create === "true";
  return (
    <>
      <h2>This is the task page</h2>
      <DisplayAllTasks create={create} />
    </>
  );
}
