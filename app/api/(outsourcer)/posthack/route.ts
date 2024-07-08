import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { UserType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    //   const { title, description, content } = await req.json();
    const data = await req.json();

    const user = await currentUser();

    if (!currentUser) {
      return new NextResponse("unauthorized", { status: 400 });
    }

    const isUserOutsourcer = await db.user.findUnique({
      where: {
        clerkId: user?.id,
      },
    });

    if (!isUserOutsourcer) {
      return new NextResponse("unauthorized", { status: 400 });
    }

    if (isUserOutsourcer.type !== UserType.OUTSOURCER) {
      return new NextResponse(
        "Sorry you are not an outsroucer. Not authorized",
        { status: 404 }
      );
    }

    const createhack = await db.postHack.create({
      data: {
        ...data,
      },
    });

    if (!createhack) {
      return new NextResponse("No hack created", { status: 401 });
    }

    return new NextResponse(JSON.stringify(createhack), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("internal server error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const allHacks = await db.postHack.findMany();

    if (!allHacks) {
      return new NextResponse("No hacks found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(allHacks), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
