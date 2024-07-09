import { db } from "@/lib/db";
import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

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
      console.log("No user found")
      return new NextResponse("No user found", { status: 404 });
    }

    const showcaseData = await db.showCasePost.findMany({
      where: {
        userId: userdata.id,
      },
      include: {
        user: true,
      },
    });

    if (!showcaseData) {
      console.log("No showcase found")
      return new NextResponse("No showcase found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(showcaseData), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
