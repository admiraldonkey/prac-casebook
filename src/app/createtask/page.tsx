import CreateTaskForm from "@/components/CreateTaskForm";
import { GetUserFromDB } from "@/utils/actions";

export default async function CreateTaskPage() {
  const userId = await GetUserFromDB();
  return (
    <>
      <h2 className="font-semibold text-5xl pb-10 text-center">
        Create New Task
      </h2>
      <CreateTaskForm userId={userId} />
    </>
  );
}
