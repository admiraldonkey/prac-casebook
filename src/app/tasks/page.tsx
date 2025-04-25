import DisplayAllTasks from "@/components/DisplayAllTasks";

export default async function TasksPage({
  searchParams,
}: {
  searchParams: Promise<{ create: string | undefined }>;
}) {
  const create = (await searchParams).create === "true";
  return (
    <>
      <DisplayAllTasks create={create} />
    </>
  );
}
