# Casebook

## DTS Developer Technical Test

"HMCTS requires a new system to be developed so caseworkers can keep track of their tasks. Your technical test is to develop that new system so caseworkers can efficiently manage their tasks."

## Identified Requirements

### User Requirements

- Users should be able to create an account to provide personalised and private access to their tasks.
- Users should be able to create, view, update and delete tasks.
- Users should have access to an easy-to-use form with clear requirements for creating and editing tasks.
- Users should be able to view all of their created tasks in a responsive and accessible user-friendly interface.

### Developer Requirements

- Created tasks require the following properties:
  - Title
  - Optional Description
  - Status
  - Due date & time
- Back-end should be able to:
  - Create tasks
  - Retrieve all tasks associated with a user
  - Retrieve a specific task by its ID
  - Update any details of a specific task
  - Delete a task
- Implementation of user management and authentication.
- Protected routes for unauthorised users.
- Use of reusable components adhering to the 'DRY' principle.
- Type safety, error handling, unit testing\*, suspense boundaries, error and not-found pages.
- Clean, user-friendly UI with responsiveness and accessibility considerations.
- Storage of users and task data in a database

## Approach

I initially planned to build two versions of this task. One as a Next.js project with server-side rendering, and a second with separate front-end and back-end repositories and a traditional API. I chose Next.js first as it was my most recently used framework.

I was hired for a freelance project shortly after starting so in the end I could only build one version. I recognise Next.js may not be the best framework for this task as a real service.

Planning included creating user and developer stories, producing wireframes and deciding on the database schema.

### Technologies, Frameworks & 3rd Party Tools

This project makes use of the following:

- Next.js React Framework
- TailwindCSS
- TypeScript
- Clerk Authentication
- RadixUI Components
- Vitest
- React-Testing-Library
- NPM & Git
- Vercel for automatic production build previews upon pushing to GitHub
- Supabase for a PostgreSQL database.

## Data Fetching & HTTP Requests

Routes are protected to unauthorised users, with only the landing and sign-in pages accessible. Attempts to view any other page will redirect to the sign-up page.

#### When a user is logged in:

Users:

- Upon viewing the tasks page, the app will send a GET request to the database to check if the user has been added previously.
  - If they have already been added, the request returns the user's database ID which is used to reference the tasks table.
  - If they haven't, a second function is called that sends a POST request to add them to the database, responding with the user's newly generated ID which then gets returned as above.

Tasks:

- On the '/createtask' route, assuming all form field validation rules have passed, upon submission of the form a POST request is sent with all relevant data required to add the new task to database.
- On the '/tasks' route, the user's ID is passed to a GET request which returns an array of all tasks in the database associated with that user ID (if any).
- On the dynamic '/tasks/[id]' route, the 'id' parameter is passed to a GET request to return any task that matches the 'id' given.
  - If none exists, the user is redirected to the not found page
  - If existing, the task form is rendered and the received task data is passed as default values to the form inputs, giving the user easy access to edit or update their task.
  - If the 'Update Task' form action is submitted, a PUT request is sent to the database containing all the updated values. User is then redirected to the main /tasks page.
  - If the Delete button is pressed, the relevant task's ID is passed to a DELETE request sent to the database to delete the task. User is then redirected to the main /tasks page.

## Comments

I decided to use TypeScript partially to challenge myself with this project. I hadn't used much before, so it was quite the learning process while building this application. While garnering some frustration at times, I ultimately found it to be very useful and I'm pleased I took the opportunity to 'learn by doing'.

\*While I had planned on extensive unit testing, I had not really used it in React or Next.js projects before and this turned out to be more complicated than anticipated. As I was pressed for time, I decided on completing the project to some degree of satisfaction before returning to them if I was able. Unfortunately, I ran out of time, although hopefully the E2E testing, error handling and use of TypeScript for added type safety may at least partially offset the lack of this.

## Future considerations

- With more time, my main focus would be extensive unit testing - I had initially planned on building this via test driven development.
- Further focus on meaningful & graceful error handling.
- Implementation of different sort options for the tasks (such as by due date, status, date added, etc).
- Improvements to accessibility and responsiveness.
- As previously mentioned, rebuilding the project again using different tools.
