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
  try {
    const user = (await auth()).sessionClaims;
    // If logged in, return their clerk id and email address
    if (user) {
      const { id, email }: User = await user;
      return { id, email };
      // otherwise return undefined
    } else {
      return undefined;
    }
  } catch (error) {
    console.error("Unable to retrieve authentication details: ", error);
  }
}

// Gets user auth details and checks if user exists in database. Returns their user ID if so, otherwise adds them to the database.
export async function GetUserFromDB() {
  const userData: User | undefined = await GetUserAuth();
  try {
    if (userData) {
      const response = await db.query(
        `SELECT id 
      FROM users 
      WHERE clerk_id = $1`,
        [userData.id]
      );
      let userId: number | undefined = await response.rows[0]?.id;
      // if userId not found, call AddNewUser to add them to the database
      if (!userId) {
        userId = await AddNewUser(userData);
      }
      //If user is found in database, run this code:
      return userId;
    }
  } catch (error) {
    console.error("Could not retrieve user information from database: ", error);
  }
}

// Add user to database if clerkID not found in there
export async function AddNewUser(user: User) {
  try {
    const response = await db.query(
      `INSERT INTO users (clerk_id, email) VALUES ($1, $2) RETURNING id`,
      [user.id, user.email]
    );
    const userId: number = await response.rows[0].id;
    return userId;
  } catch (error) {
    console.error("Unable to add user to database: ", error);
  }
}

// Gets the logged in users ID and retrieves all associated tasks from the database, returning as an array. If none exist, returns the user's ID instead.
export async function GetTasks() {
  try {
    const userId = await GetUserFromDB();
    const response = await db.query(
      `SELECT *
    FROM tasks
    WHERE user_id = $1`,
      [userId]
    );
    const tasks = await response.rows;
    if (!tasks[0]) {
      return userId;
    } else {
      return tasks;
    }
  } catch (error) {
    console.error("Unable to find tasks in database: ", error);
  }
}

// Takes a task ID as an argument and returns the requested task from the database, otherwise returns null.
export async function GetTask(taskId: number) {
  try {
    const response = await db.query(
      `SELECT *
    FROM tasks
    WHERE id = $1`,
      [taskId]
    );
    const task = await response.rows;
    if (!task[0]) {
      return null;
    } else {
      return task[0];
    }
  } catch (error) {
    console.error("Unable to find specified task: ", error);
  }
}

// Deletes a task from the database
export async function DeleteTask(taskId: number) {
  try {
    await db.query(`DELETE FROM tasks WHERE id = $1`, [taskId]);
    redirect("/tasks");
  } catch (error) {
    console.error("Failed to delete task from database: ", error);
  }
}
