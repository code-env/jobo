import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const userdata = await db.user.findUnique({
      where: {
        clerkId: user.id,
      },
    });
    if (!userdata) {
      return new NextResponse("No user found", { status: 404 });
    }
    const conversation = await db.conversation.create({
      data: {
        userId: userdata.id,
        toUserId: userId,
      },
    });
    if (!conversation) {
      return new NextResponse("No conversation found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(conversation), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
