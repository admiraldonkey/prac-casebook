"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

type User = {
  id?: string;
  email?: string;
};
export async function GetUserAuth() {
  // Get logged in user's clerk info
  const user = (await auth()).sessionClaims;
  if (user) {
    const { id, email }: User = await user;
    return { id, email };
  } else {
    return undefined;
  }
}

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
      console.log(
        "User not found! Drats. Better update the DB! Clerk id is: ",
        userData?.id
      );
      userId = await AddNewUser(userData);
      // console.log("userId returned from adding to db is: ", await userId);
    }
    //If user is found in database, run this code:
    // console.log("User found! huzzah! User ID is: ", userId);
    return userId;
  }
}

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

export async function AddNewUser(user: User) {
  // Add user to database if clerkID not found in there
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
