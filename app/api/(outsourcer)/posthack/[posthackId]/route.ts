import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

import { UserType } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { posthackId: string } }
) {
  try {
    const { posthackId } = params;

    if (!posthackId) {
      return new NextResponse("No posthack id provided", { status: 400 });
    }
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { posthackId: string } }
) {
  try {
    const data = await req.json();
    const currentuser = await currentUser();
    const { posthackId } = params;

    if (!currentUser) {
      return new NextResponse("Email and Clerk ID are required", {
        status: 400,
      });
    }

    const user = await db.user.findUnique({
      where: {
        id: currentuser?.id,
      },
    });

    if (!user) {
      return new NextResponse("No user found", {
        status: 404,
      });
    }

    if (user.type != UserType.OUTSOURCER) {
      return new NextResponse(
        "Sorry you are not an outsourcer. Not authorized",
        { status: 404 }
      );
    }

    if (!posthackId) {
      return new NextResponse("No posthack id provided", { status: 400 });
    }

    const updateUser = await db.postHack.update({
      where: {
        id: posthackId,
        userId: user.id,
      },
      data: {
        ...data,
      },
    });
    return new NextResponse(JSON.stringify(updateUser), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
