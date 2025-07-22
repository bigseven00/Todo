import { supabase } from "@/lib/supabase";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { profilePicture } = await req.json();
  if (!profilePicture) {
    return NextResponse.json(
      { error: "Profile picture URL is required" },
      { status: 400 }
    );
  }

  const userId = session.user.id;
  const urlParts = profilePicture.split("/");
  const fileName = urlParts[urlParts.length - 1];
  const filePath = `${userId}/${fileName}`;

  try {
    const { error: deleteError } = await supabase.storage
      .from("profile-pictures")
      .remove([filePath]);

    if (deleteError) {
      console.error("Error deleting file:", deleteError);
      return NextResponse.json(
        { error: `Failed to delete file: ${deleteError.message}` },
        { status: 500 }
      );
    }

    const { error: dbError } = await supabase
      .from("users")
      .update({ profile_picture: null })
      .eq("id", userId);

    if (dbError) {
      console.error("Error removing profile picture:", dbError);
      return NextResponse.json(
        { error: `Failed to update database: ${dbError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Profile picture removed" });
  } catch (error) {
    console.error("Unexpected error during removal:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}