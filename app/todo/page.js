import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import TodoClient from "./todoClient";

export default async function TodoPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>Please log in to view your todos.</div>;
  }

  if (!session.user.id) {
    return <div>Error: User ID not found in session.</div>;
  }

  const { data: todos, error } = await supabase
    .from("todos")
    .select("id, task, completed")
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Error fetching todos:", error);
    return <div>Error fetching todos.</div>;
  }

  return <TodoClient initialTodos={todos || []} userId={session.user.id} />;
}