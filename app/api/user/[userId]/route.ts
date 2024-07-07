import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";

interface Params {
  userId: string;
}

async function updateUserInClerk(userId: string, body: any): Promise<any> {
  try {
    return await clerkClient.users.updateUser(userId, body);
  } catch (error) {
    console.error("Error updating user in Clerk:", error);
    throw new Error("Error updating user in Clerk");
  }
}

async function updateUserInDatabase(userId: string, body: any): Promise<any> {
  return await db.user.update({
    where: {
      clerkId: userId,
    },
    data: {
      ...body,
    },
  });
}

async function getUserById(userId: string) {
  return await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
}

async function getCurrentUser(userId: string) {
  return await db.user.findUnique({
    where: {
      clerkId: userId,
    },
  });
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const { userId: id } = params;
    const { userId } = auth();
    const body = await req.json();

    const newBody = { ...body, age: parseInt(body.age) };

    if (!userId) {
      return new NextResponse("Unauthorized!", {
        status: 400,
      });
    }

    const user = await getUserById(id);

    const isAdmin = await getCurrentUser(userId);

    if (!user) {
      return new NextResponse("No user found!", {
        status: 404,
      });
    }
    if (user.clerkId === id || isAdmin?.type === "ADMIN") {
      try {
        const targetUserId = userId === user.clerkId ? userId : id;
        await updateUserInClerk(targetUserId, newBody);
        await updateUserInDatabase(targetUserId, newBody);
      } catch (error: any) {
        return new NextResponse(error.message, {
          status: 500,
        });
      }

      return NextResponse.json("Profile updated", {
        status: 200,
      });
    }

    return new NextResponse("You can only update your profile!", {
      status: 400,
    });
  } catch (error: any) {
    console.error("ERROR WHILE UPDATING USER", error.message);
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId)
      return NextResponse.json("invalid Url", { status: 400 });

    console.log(params.userId);

    const user = await db.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log("GETTING USER", error.message);

    return NextResponse.json("Internal server error", { status: 500 });
  }
}
