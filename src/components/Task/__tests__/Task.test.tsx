import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import Task from "../Task";

const mockTask: Task = {
  id: 1,
  title: "Test Task",
  description: "This is for testing",
  status: "progress",
  due: new Date("October 13, 2028 11:13:00"),
  user_id: 2,
};

describe("should render a task", () => {
  render(<Task task={mockTask} />);
  const title = screen.queryByText("Test Task");
  expect(title).toBeInTheDocument();
});

// Tests not currently working. Hope to fix if I have time.
