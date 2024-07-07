import { db } from "@/lib/db";

import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";


export async function GET(req: Request, {params}:{params:{userId: string}}) {
    try {

        const { userId } = params;
        
        if (!userId) {
            return new NextResponse("User ID is required", { status: 400 });
        }


        const user = await db.user.findUnique({
            where: {
                id: userId
            }
        });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        return new NextResponse(JSON.stringify(user), { status: 200 });
    } catch (error: any) {
        console.log(error.message);
        return new NextResponse("Internal Server error", { status: 500 });
    }
    
}


