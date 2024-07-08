import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    const { postId, commentId } = params;
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

    const postComments = await db.comments.findUnique({
      where: {
        id: commentId,
        showCasePostId: showcaseData.id,
      },
    });

    if (!postComments) {
      return new NextResponse("No comments found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(postComments), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    const { postId, commentId } = params;
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

    const postComments = await db.comments.findUnique({
      where: {
        id: commentId,
        showCasePostId: showcaseData.id,
      },
    });

    if (!postComments) {
      return new NextResponse("No comments found", { status: 404 });
    }

    await db.comments.delete({
      where: {
        id: commentId,
      },
    });

    return new NextResponse("Comment deleted successfully", { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { postId: string; commentId: string } }
) {
  try {
    const user = await currentUser();
    const { postId, commentId } = params;
    const data = await req.json();
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

    const postComments = await db.comments.findUnique({
      where: {
        id: commentId,
        showCasePostId: showcaseData.id,
      },
    });

    if (!postComments) {
      return new NextResponse("No comments found", { status: 404 });
    }

    const updatedComment = await db.comments.update({
      where: {
        id: commentId,
      },
      data: {
        message: data.message,
      },
    });

    return new NextResponse(JSON.stringify(updatedComment), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
