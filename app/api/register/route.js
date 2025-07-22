import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, firstName, lastName, phoneNumber } =
    await req.json();

  const { data: existingUser, error: existingUserError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUserError && existingUserError.code !== "PGRST116") {
    console.error("Error checking existing user:", existingUserError);
    return NextResponse.json(
      { error: "Error checking user existence" },
      { status: 500 }
    );
  }

  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const { data: newUser, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: `Failed to register: ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Registered successfully" },
    { status: 201 }
  );
}