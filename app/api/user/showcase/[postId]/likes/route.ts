import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const user = await currentUser();
    const { postId } = params;
    if (!postId) {
      return new NextResponse("PostId is required", { status: 400 });
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

    const showcaseData = await db.showCasePost.findUnique({
      where: {
        id: postId,
      },
    });

    if (!showcaseData) {
      return new NextResponse("No showcase found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(showcaseData), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
