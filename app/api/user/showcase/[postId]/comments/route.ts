import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    // console.log(params);

    const { message } = await req.json();

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

    const showcaseData = await db.showCasePost.findUnique({
      where: {
        id: params.postId,

        //damn man tu veut me tuer comme ca?
        // userId: userdata.id, d
      },
    });

    if (!showcaseData) {
      return new NextResponse("No showcase found", { status: 404 });
    }

    const newcomment = await db.comments.create({
      data: {
        userId: userdata.id,
        showCasePostId: showcaseData.id,
        message: message,
      },
    });

    if (!newcomment) {
      return new NextResponse("No comment found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(newcomment), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

    if (!postId) {
      return new NextResponse("PostId is required", { status: 400 });
    }

    const getallcommentsforpost = await db.comments.findMany({
      where: {
        showCasePostId: postId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!getallcommentsforpost) {
      return new NextResponse("No comments found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(getallcommentsforpost), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
