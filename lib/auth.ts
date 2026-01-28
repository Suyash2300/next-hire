import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) return null;

  // Mock return based on session
  return {
    id: session.user.id || "mock-id",
    name: session.user.name || "Mock User",
    email: session.user.email,
    role: (session.user as any).role || "user",
    password: "hashedpassword", // Field existing in User type but not usually needed here
    createdAt: new Date(),
  };
}
