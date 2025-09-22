"use server";

import { revalidatePath } from "next/cache";
import { checkRole } from "@/lib/roles";
import { clerkClient } from "@clerk/nextjs/server";

export async function setRole(formData: FormData) {
  const client = await clerkClient();

  if (!checkRole("admin")) {
    throw new Error("Not Authorized");
  }

  try {
    await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: formData.get("role") },
      }
    );
    revalidatePath("/admin");
  } catch (err) {
    throw new Error(`Failed to set role: ${err}`);
  }
}

export async function removeRole(formData: FormData) {
  const client = await clerkClient();

  if (!checkRole("admin")) {
    throw new Error("Not Authorized");
  }

  try {
    await client.users.updateUserMetadata(
      formData.get("id") as string,
      {
        publicMetadata: { role: null },
      }
    );
    revalidatePath("/admin");
  } catch (err) {
    throw new Error(`Failed to remove role: ${err}`);
  }
}
