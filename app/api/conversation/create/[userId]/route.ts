import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { UserType } from "@prisma/client";

export async function POST(req: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;
    const outsourcer = await currentUser();
    if (!outsourcer) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userdata = await db.user.findUnique({
      where: {
        clerkId: outsourcer.id,
      },
    });
    if (!userdata) {
      return new NextResponse("No user found", { status: 404 });
    }

    if (userdata.type !== UserType.OUTSOURCER) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Check if a conversation already exists between the two users
    const doesConversationExist = await db.conversation.findFirst({
      where: {
        usersIds: {
          hasEvery: [userdata.id, userId],
        },
      },
    });

    if (doesConversationExist) {
    
      return new NextResponse(JSON.stringify(doesConversationExist), { status: 200 });
    }

   
    const newConversation = await db.conversation.create({
      data: {
        usersIds: [userdata.id, userId],
        // senderId: userdata.id,
        // receiverId: userId,
      },
    });

    return new NextResponse(JSON.stringify(newConversation), { status: 201 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


// export async function DELETE(
//   req: Request,
//   { params }: { params: { userId: string } }
// ) {
//   try {
//     const { userId } = params;
//     const outsourcer = await currentUser();
//     if (!outsourcer) {
//       return new NextResponse("Unauthorized", { status: 400 });
//     }
//     const userdata = await db.user.findUnique({
//       where: {
//         clerkId: outsourcer.id,
//       },
//     });
//     if (!userdata) {
//       return new NextResponse("No user found", { status: 404 });
//     }

  
//     if (!conversationchanel) {
//       return new NextResponse("No conversation found", { status: 404 });
//     }

//     await db.conversation.delete({
//       where: {
//         id: conversationchanel.id,
//       },
//     });

//     return new NextResponse("Conversation deleted", { status: 200 });
//   } catch (error: any) {
//     console.log(error.message);
//     return new NextResponse("Internal Server error", { status: 500 });
//   }
// }
