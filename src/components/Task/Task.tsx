import Link from "next/link";

interface Props {
  task: Task;
}
// Function to convert task status values to a more user friendly output for displaying on page.
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

// Component that receives a task object as a prop and renders the data in a new row on the tasks table
export default function Task({ task }: Props) {
  const { id, title, description, status, due } = task;
  const statusName = getTaskStatus(status);
  return (
    <tr className="border-b-1 p-4 my-10 bg-white text-lg">
      <td className="py-4 font-semibold">{title}</td>
      <td className="py-4">{description}</td>
      <td className="py-4 font-semibold">{statusName}</td>
      {/* Converts date object to a user readable format */}
      <td className="py-4">{due.toUTCString()}</td>
      <td className="text-right py-4">
        {/* Link to edit the task */}
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
