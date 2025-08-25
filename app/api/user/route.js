// app/api/user/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const user = await prisma.users.findUnique({
    where: { email: session.user.email },
    select: {
      id: true,
      name: true,
      email: true,
      contact: true,
      address: true,
      joinedOn: true, 
    },
  });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  return new Response(JSON.stringify(user), { status: 200 });
}
