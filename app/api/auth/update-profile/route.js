import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";


export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), { status: 401 });
  }

  const { name, email, contact, address } = await req.json();

  const updatedUser = await prisma.users.update({
    where: { email: session.user.email },
    data: { name, email, contact, address },
  });

  return new Response(JSON.stringify(updatedUser), { status: 200 });
}
