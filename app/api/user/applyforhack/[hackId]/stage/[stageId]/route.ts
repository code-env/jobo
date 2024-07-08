import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { hackId: string; stageId: string } }
) {
  try {
    const user = await currentUser();
    const { hackId } = params;
    const { content } = await req.json();
    if (!hackId) {
      return new NextResponse("HackId is required", { status: 400 });
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

    const hackData = await db.postHack.findUnique({
      where: {
        id: hackId,
      },
    });

    if (!hackData) {
      return new NextResponse("No hack found", { status: 404 });
    }

    const doesstageexist = await db.stage.findUnique({
      where: {
        id: params.stageId,
      },
    });
    if (!doesstageexist) {
      return new NextResponse("No stage found", { status: 404 });
    }

    const doesapplydataexist = await db.submittions.findFirst({
      where: {
        userId: userdata.id,
        postId: hackId,
        stageId: params.stageId,
      },
    });
    if (doesapplydataexist) {
      const updatedata = await db.submittions.update({
        where: {
          id: doesapplydataexist.id,
        },
        data: {
          content: content,
        },
      });

      if (!updatedata) {
        return new NextResponse("No application found", { status: 404 });
      }

      return new NextResponse(JSON.stringify(updatedata), { status: 200 });
    }

    const applydata = await db.submittions.create({
      data: {
        userId: userdata.id,
        postId: hackId,
        stageId: params.stageId,
        content: content,
      },
    });

    return new NextResponse(JSON.stringify(applydata), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
