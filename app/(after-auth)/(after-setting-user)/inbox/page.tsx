import { Metadata } from "next";
import React from "react";
import TextMorph from "@/components/forms/text-morph";
import { currentUser } from "@clerk/nextjs/server";

export const metadata: Metadata = {
  title: "Inbox",
};

const Inbox = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  return (
    <div>
      <TextMorph params={{ conversationId: user.id }} />
    </div>
  );
};

export default Inbox;
