import { cookies } from "next/headers";
import type { Role } from "./policies";

// Simple mock auth (replace with NextAuth/JWT later)
export async function getUser() {
  const cookieStore = cookies();
  const role = ((await cookieStore).get("user_role")?.value as Role) || "guest";
  const id = (await cookieStore).get("user_id")?.value || "anon";
  return { id, role };
}
