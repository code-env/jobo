import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { hackId: string } }
) {
  try {
    const user = await currentUser();
    const { hackId } = params;
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

    const applydata = await db.submittions.groupBy({
      by: ["userId", "postId"],
      where: {
        userId: userdata.id,
        postId: hackId,
      },
    });

    if (!applydata) {
      return new NextResponse("No application found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(applydata), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
