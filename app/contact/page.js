import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import ContactClient from "./contactClient";

export default async function ContactPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="max-w-md mx-auto mt-14 text-center">
        <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
        <p>
          Please{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            log in
          </a>{" "}
          to send a message.
        </p>
      </div>
    );
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("first_name, last_name, email")
    .eq("id", session.user.id)
    .single();

  if (error || !user) {
    console.error("Error fetching user:", error);
    return (
      <div className="max-w-md mx-auto mt-14 text-center">
        <p>Error fetching user data. Please try again later.</p>
      </div>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  return <ContactClient userEmail={user.email} userName={fullName} />;
}