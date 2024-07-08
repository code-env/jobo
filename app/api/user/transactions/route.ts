import { db } from "@/lib/db";

import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal Server error", { status: 500 });
  }
}
