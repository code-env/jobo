import { db } from "@/lib/db";

import { currentUser } from "@clerk/nextjs/server";

import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { postId: string } }
// ) {
//   try {
//     const user = await currentUser();
//     const { postId } = params;
//     if (!postId) {
//       return new NextResponse("PostId is required", { status: 400 });
//     }
//     if (!user) {
//       return new NextResponse("Unauthorized", { status: 400 });
//     }

//     const userdata = await db.user.findUnique({
//       where: {
//         clerkId: user.id,
//       },
//     });

//     if (!userdata) {
//       return new NextResponse("No user found", { status: 404 });
//     }

//     const showcaseData = await db.showCasePost.findUnique({
//       where: {
//         id: postId,
//       },
//     });

//     if (!showcaseData) {
//       return new NextResponse("No showcase found", { status: 404 });
//     }

//     return new NextResponse(JSON.stringify(showcaseData), { status: 200 });
//   } catch (error: any) {
//     console.log(error.message);
//     return new NextResponse("Internal Server error", { status: 500 });
//   }
// }

export async function POST(
  req: Request,
  { params }: { params: { postId: string } }
) {
  try {
    const { postId } = params;

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

    const existingLikefromUser = await db.likes.findFirst({
      where: {
        userId: userdata.id,
        postId: postId,
      },
    });

    if (existingLikefromUser) {
      const deletedlike = await db.likes.delete({
        where: {
          id: existingLikefromUser.id,
        },
      });

      if (!deletedlike) {
        return new NextResponse("No like found", { status: 404 });
      }

      await db.showCasePost.update({
        where: {
          id: postId,
        },
        data: {
          likescount: {
            decrement: 1,
          },
        },
      });

      return NextResponse.json(deletedlike, { status: 200 });
    }

    const newpostlike = await db.likes.create({
      data: {
        userId: userdata.id,
        postId,
      },
    });

    if (!newpostlike) {
      return new NextResponse("No like found", { status: 404 });
    }

    await db.showCasePost.update({
      where: {
        id: postId,
      },
      data: {
        likescount: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(newpostlike, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json("Internal Server error", { status: 500 });
  }
}
