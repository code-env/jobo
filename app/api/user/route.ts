import { db } from "@/lib/db";

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
    const { email } = await req.json();
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
