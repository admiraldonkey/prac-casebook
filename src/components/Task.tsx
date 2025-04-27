import Link from "next/link";
import Button from "./Button";

interface Props {
  task: Task;
}
// Component that displays all tasks associated with the logged in user
function getTaskStatus(status: string) {
  switch (status) {
    case "pending":
      return "Pending";
    case "progress":
      return "In Progress";
    case "complete":
      return "Completed";
    default:
      return "Invalid value";
  }
}

export default function Task({ task }: Props) {
  const { id, title, description, status, due } = task;
  const statusName = getTaskStatus(status);
  return (
    <tr className="border-b-1 p-4 my-10 bg-white text-lg">
      <td className="py-4 font-semibold">{title}</td>
      <td className="py-4">{description}</td>
      <td className="py-4 font-semibold">{statusName}</td>
      <td className="py-4">{due.toUTCString()}</td>
      <td className="text-right py-4">
        <Link
          href={`/tasks/${id}`}
          className="font-bold text-2xl mr-2 hover:underline hover:underline-offset-4 hover:decoration-2"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
