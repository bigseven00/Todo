import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import ProfileClient from "./profileClient";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  const { data: user, error } = await supabase
    .from("users")
    .select("id, email, first_name, last_name, phone_number, profile_picture")
    .eq("id", session.user.id)
    .single();

  if (error || !user) {
    console.error("Error fetching user:", error);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Error fetching user data. Please try again later.</p>
      </div>
    );
  }

  return <ProfileClient user={user} />;
}