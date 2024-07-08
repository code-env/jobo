import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UserType } from "@prisma/client";

export async function GET(
  req: Request,
  { params }: { params: { posthackId: string; stageId: string } }
) {
  try {
    const { posthackId } = params;

    if (!posthackId) {
      return new NextResponse("No posthack id provided", { status: 400 });
    }
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

    const doesposthackexist = await db.postHack.findUnique({
      where: {
        id: posthackId,
        userId: userdata.id,
      },
    });

    if (!doesposthackexist) {
      return new NextResponse("No posthack found", { status: 404 });
    }

    const stagedata = await db.stage.findUnique({
      where: {
        id: posthackId,
      },
    });

    if (!stagedata) {
      return new NextResponse("No stage found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(stagedata), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { posthackId: string; stageId: string } }
) {
  try {
    const data = await req.json();
    const currentuser = await currentUser();
    const { posthackId, stageId } = params;

    if (!currentuser) {
      return new NextResponse("Email and Clerk ID are required", {
        status: 400,
      });
    }

    const user = await db.user.findUnique({
      where: {
        clerkId: currentuser?.id,
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

    const isposthackexist = await db.postHack.findUnique({
      where: {
        id: posthackId,
        userId: user.id,
      },
    });

    if (!isposthackexist) {
      return new NextResponse("No posthack found", { status: 404 });
    }

    const updateUser = await db.stage.update({
      where: {
        id: stageId,
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
