import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { UserType } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const outsourcer = await currentUser();
    if (!outsourcer) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const userdata = await db.user.findUnique({
      where: {
        clerkId: outsourcer.id,
      },
    });
    if (!userdata) {
      return new NextResponse("No user found", { status: 404 });
    }

    if (userdata.type !== UserType.OUTSOURCER) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const doeschanelalreadyexist = await db.conversation.findUnique({
      where: {
        usersIds: [userdata.id, userId],
      },
    });

    if (doeschanelalreadyexist) {
      return new NextResponse(
        "You already created the chanel with this user ",
        { status: 200 }
      );
    }

    const conversationchanel = await db.conversation.create({
      data: {
        usersIds: [userdata.id, userId],
      },
    });
    if (!conversationchanel) {
      return new NextResponse("No conversation found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(conversationchanel), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    const outsourcer = await currentUser();
    if (!outsourcer) {
      return new NextResponse("Unauthorized", { status: 400 });
    }
    const userdata = await db.user.findUnique({
      where: {
        clerkId: outsourcer.id,
      },
    });
    if (!userdata) {
      return new NextResponse("No user found", { status: 404 });
    }

    const conversationchanel = await db.conversation.findUnique({
      where: {
        usersIds: [userdata.id, userId],
      },
    });

    if (!conversationchanel) {
      return new NextResponse("No conversation found", { status: 404 });
    }

    await db.conversation.delete({
      where: {
        id: conversationchanel.id,
      },
    });

    return new NextResponse("Conversation deleted", { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
