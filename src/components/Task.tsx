import Link from "next/link";
import Button from "./Button";

interface Props {
  task: Task;
}
// Component that displays all tasks associated with the logged in user
function getTaskStatus(status: string) {
  switch (status) {
    case "pending":
      return <span className="text-brightred font-semibold">Pending</span>;
    case "progress":
      return <span className="text-lighthover font-semibold">In Progress</span>;
    case "complete":
      return <span className="text-brightgreen font-semibold">Completed</span>;
    default:
      return "Invalid value";
  }
}

export default function Task({ task }: Props) {
  const { id, title, description, status, due } = task;
  const statusName = getTaskStatus(status);
  return (
    <div className="border-1 rounded-xl p-4 my-4 bg-white">
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Link
          href={`/tasks/${id}`}
          className="font-bold text-2xl mr-2 hover:underline hover:underline-offset-4 hover:decoration-2"
        >
          Edit
        </Link>
      </div>
      <p className="text-lg p-2 pb-4">{description}</p>
      <div className="flex justify-between">
        <p className="bg-govbluehover text-white px-2 pb-1 rounded-md">
          Status: {statusName}
        </p>
        <p>Due By: {due.toUTCString()}</p>
      </div>
    </div>
  );
}
