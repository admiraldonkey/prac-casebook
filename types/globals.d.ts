export {};

declare global {
  interface CustomJwtSessionClaims {
    id?: string;
    email?: string;
  }
  type Task = {
    id: number;
    title: string;
    description?: string;
    status: "pending" | "progress" | "complete";
    due: Date;
    user_id: number;
  };
}
