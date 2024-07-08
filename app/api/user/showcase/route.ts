import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    const data = await req.json();
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

    const showcaseData = await db.showCasePost.create({
      data: {
        userId: userdata.id,
        ...data,
      },
    });

    return new NextResponse(JSON.stringify(showcaseData), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const getallshowcase = await db.showCasePost.findMany({
      include: {
        user: true,
      },
    });

    if (!getallshowcase) {
      return new NextResponse("No showcase found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(getallshowcase), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
