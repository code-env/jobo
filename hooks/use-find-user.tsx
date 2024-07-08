import { db } from "@/lib/db";

export async function useFindUser(clerkId: string) {
  const user = await db.user.findUnique({
    where: {
      clerkId,
    },
  });

  if (!user) return;

  return user;
}
