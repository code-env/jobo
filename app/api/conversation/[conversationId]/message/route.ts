import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const user = await currentUser();
    const data = await req.json();

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

    const conversationData = await db.conversation.findUnique({
      where: {
        id: params.conversationId,
      },
    });

    if (!conversationData) {
      return new NextResponse("No conversation found", { status: 404 });
    }

    const newmessage = await db.message.create({
      data: {
        conversationId: conversationData.id,
        userId: userdata.id,
        ...data,
      },
    });
    if (!newmessage) {
      return new NextResponse("No message found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(newmessage), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { conversationId: string } }
) {
  try {
    const user = await currentUser();
    const { conversationId } = params;
    if (!conversationId) {
      return new NextResponse("conversationId is required", { status: 400 });
    }
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

    const conversationData = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
    });

    if (!conversationData) {
      return new NextResponse("No conversation found", { status: 404 });
    }

    const messages = await db.message.findMany({
      where: {
        conversationId: conversationData.id,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!messages) {
      return new NextResponse(
        "No message found for this conversation chanell yet",
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(messages), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
