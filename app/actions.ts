"use server";

import { leadSchema } from "@/lib/schema";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- LEAD ACTIONS ---
export async function createLead(data: unknown) {
  const result = leadSchema.safeParse(data);
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("leads").insert([result.data]);

  if (error) {
    return { success: false, message: "Database error. Please try again." };
  }

  revalidatePath("/admin");
  return { success: true };
}

export async function updateLeadStatus(id: string, status: "New" | "Contacted" | "Closed") {
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);

  if (error) return { success: false, message: error.message };

  revalidatePath("/admin");
  return { success: true };
}

// --- AUTH ACTIONS ---
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}