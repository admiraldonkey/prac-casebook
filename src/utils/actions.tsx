"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";

type User = {
  id?: string;
  email?: string;
};
export async function GetUserAuth() {
  // If user logged in, retreive their session details
  const user = (await auth()).sessionClaims;
  // If logged in, return their clerk id and email address
  if (user) {
    const { id, email }: User = await user;
    return { id, email };
    // otherwise return undefined
  } else {
    return undefined;
  }
}

// Gets user auth details and checks if user exists in database. Returns their user ID if so, otherwise adds them to the database.
export async function GetUserFromDB() {
  const userData: User | undefined = await GetUserAuth();
  if (userData) {
    const response = await db.query(
      `SELECT id 
      FROM users 
      WHERE clerk_id = $1`,
      [userData.id]
    );
    // const userId: number | undefined = await response.rows[0]?.id;
    let userId: number | undefined = await response.rows[0]?.id;
    // if userId not found, call AddNewUser to add them to the database
    if (!userId) {
      userId = await AddNewUser(userData);
      // console.log("userId returned from adding to db is: ", await userId);
    }
    //If user is found in database, run this code:
    // console.log("User found! huzzah! User ID is: ", userId);
    return userId;
  }
}

// Gets the logged in users ID and retrieves all associated tasks from the database, returning as an array. If none exist, returns the user's ID instead.
export async function GetTasks() {
  const userId = await GetUserFromDB();
  // console.log("userId fetched for tasks is: ", userId);
  const response = await db.query(
    `SELECT *
    FROM tasks
    WHERE user_id = $1`,
    [userId]
  );
  const tasks = await response.rows;
  console.log("retrieved tasks are: ", tasks);
  if (!tasks[0]) {
    return userId;
  } else {
    // console.log("task due: ", tasks[0].due.toString());
    return tasks;
  }
}

// Takes a task ID as an argument and returns the requested task from the database, otherwise returns null.
export async function GetTask(taskId: number) {
  console.log("taskId received by GetTask is: ", taskId);
  console.log("And the type is: ", typeof taskId);
  const response = await db.query(
    `SELECT *
    FROM tasks
    WHERE id = $1`,
    [taskId]
  );
  const task = await response.rows;
  console.log(task[0]);
  if (!task[0]) {
    return null;
  } else {
    return task[0];
  }
}

// Deletes a task from the database
export async function DeleteTask(taskId: number) {
  // console.log("Deleting task: ", task.title);
  await db.query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
  console.log("Task deleted");
  redirect("/tasks");
}

// Add user to database if clerkID not found in there
export async function AddNewUser(user: User) {
  // console.log("attempting to add details to database: ", user);
  const response = await db.query(
    `INSERT INTO users (clerk_id, email) VALUES ($1, $2) RETURNING id`,
    [user.id, user.email]
  );
  const userId: number = await response.rows[0].id;
  // console.log(
  //   "Data returned from database upon adding user to db is: ",
  //   await userId
  // );
  return userId;
}
