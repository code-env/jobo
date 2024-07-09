import { Metadata } from "next";
import React from "react";
import TextMorph from "@/components/forms/text-morph";
import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Inbox",
};

const Inbox = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }
  const userdata = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!userdata) return;

  if (userdata)

  return (
    <div>
      <TextMorph params={{ conversationId: user.id, Userdata:userdata }} />
    </div>
  ); 
};

export default Inbox;
