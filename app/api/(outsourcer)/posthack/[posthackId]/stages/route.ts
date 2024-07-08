import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { UserType } from "@prisma/client";

export async function POST(
  req: Request,
  { params }: { params: { posthackId: string } }
) {
  try {
    const data = await req.json();
    const user = await currentUser();
    const { posthackId } = params;

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

    const createStage = await db.stage.create({
      data: {
        ...data,
        postId: posthackId,
      },
    });

    if (!createStage) {
      return new NextResponse("No stage found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(createStage), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { posthackId: string } }
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
    if (userdata.type != UserType.OUTSOURCER) {
      return new NextResponse(
        "Sorry you are not an outsourcer. Not authorized",
        { status: 404 }
      );
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

    const stagedata = await db.stage.findMany({
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
