import Link from "next/link";

interface Props {
  task: Task;
}
// Converts task status input values to a more user friendly output for displaying on page.
function getTaskStatus(status: Task["status"]) {
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

// Converts the date object to a user readable string, before trimming off the seconds value and timezone code.
function convertDate(due: Date) {
  try {
    const dateString = due.toUTCString();
    const trimmedDate = dateString.slice(0, -7);
    return trimmedDate;
  } catch (error) {
    console.error("Failed to convert date object to UTC string: ", error);
    return "Date not found";
  }
}

// Component that receives a task object as a prop and renders the data in a new row on the tasks table
export default function Task({ task }: Props) {
  const { id, title, description, status, due } = task;
  const statusName = getTaskStatus(status);
  return (
    <tr className="border-b-1 p-4 my-10 bg-white text-lg" tabIndex={0}>
      <td className="py-4 pr-4 font-semibold" tabIndex={0}>
        {title}
      </td>
      <td className="py-4 pr-4" tabIndex={0}>
        {description}
      </td>
      <td className="py-4 font-semibold" tabIndex={0}>
        {statusName}
      </td>
      <td className="py-4 px-2" tabIndex={0}>
        {convertDate(due)}
      </td>
      <td className="text-right py-4" tabIndex={0}>
        {/* Link to edit the task */}
        <Link
          href={`/tasks/${id}`}
          className="font-bold text-lg md:text-xl lg:text-2xl mr-2 hover:underline hover:underline-offset-4 hover:decoration-2"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
}
