'use server'

import { createClient } from "@/lib/server";
import { revalidatePath } from "next/cache"

export async function addStudent(formData: FormData) {
  const supabase = await createClient();
}