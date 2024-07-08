"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { someConversations } from "@/constants";
import zenith from "@/public/zenith.jpg";
import { cn } from "@/lib/utils";

const Conversations = () => {
  const conversations = someConversations();
  const pathname = usePathname();
  const router = useRouter();

  const location = pathname.split("/")[2];

  return (
    <div>
      <div>
        <p className="flex items-center justify-center gap-2 px-4">
          <MessageCircle className="w-4 h-4" />
          <span className="text-xs uppercase font-bold">conversations</span>
        </p>
      </div>

      <div className="flex flex-col gap-1">
        {conversations.map((conversation, index) => {
          //code here

          const isActive = conversation.path === location;

          const handleChangeChat = (conversationId: string) => {
            if (!conversationId) return;
            router.push(`/inbox/${conversationId}`);
          };

          return (
            <div
              key={index}
              // href={`/inbox/${conversation.path}`}
              onClick={() => handleChangeChat(conversation.path)}
              className={cn(
                "text-sm py-3 px-6 hover:bg-foreground slowmo relative flex items-center gap-2 cursor-pointer",
                {
                  "bg-foreground before:h-full before:w-1 before:left-0 before:top-0 before:bg-background before:absolute":
                    isActive,
                }
              )}
            >
              <Image
                className="w-10 h-10 rounded-full object-cover object-top"
                src={zenith}
                width={40}
                height={40}
                alt="user Image"
              />
              <div className="flex-1 flex flex-col">
                <p className="flex items-center justify-between">
                  <span className="font-semibold text-base">
                    {conversation.name}
                  </span>
                  <span className="text-xs">5 Jan</span>
                </p>
                <p className="truncate-text text-zinc-500">
                  {conversation.lastmessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Conversations;
