import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const allUsers = await db.user.findMany();

    if (!allUsers) {
      return new NextResponse("No users found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(allUsers), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { email, clerkId } = await req.json();

    if (!email || !clerkId) {
      return new NextResponse("Email and Clerk ID are required", {
        status: 400,
      });
    }

    const createUser = await db.user.create({
      data: {
        email,
        clerkId,
      },
    });

    return new NextResponse(JSON.stringify(createUser), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    console.log(data);

    const currentuser = await currentUser();

    if (!currentUser) {
      return new NextResponse("Email and Clerk ID are required", {
        status: 400,
      });
    }

    const updateUser = await db.user.update({
      where: {
        clerkId: currentuser?.id,
      },
      data: {
        ...data,
      },
    });

    return new NextResponse(JSON.stringify(updateUser), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
