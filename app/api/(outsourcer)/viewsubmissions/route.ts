import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { UserType } from "@prisma/client";

export async function GET(req: Request) {
  try {
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

    const isuseroveroutsourer = userdata?.type === UserType.OUTSOURCER;

    if (!isuseroveroutsourer) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const submissions = await db.submittions.groupBy({
      by: ["userId", "postId", "stageId"],
      where: {
        userId: userdata.id,
      },
    });

    if (!submissions) {
      return new NextResponse("No submissions found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(submissions), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
