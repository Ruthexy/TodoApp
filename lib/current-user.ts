import { getServerSession } from "next-auth/next";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { authOptions } from "./auth";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  await connectDB();

  let user = await User.findOne({ email: session.user.email });
  if (!user) {
    user = await User.create({ email: session.user.email, name: session.user.name });
  }
  return user;
}
