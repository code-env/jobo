import { useFindUser } from "@/hooks/use-find-user";
import { PostHack } from "@prisma/client";
import Image from "next/image";
import React from "react";

const Post = async ({ content }: { content: PostHack }) => {
  const user = await useFindUser(content.userId);

  if (!user) return;

  return (
    <div className="flex gap-3">
      <div className="w-36 h-2 min-w-10 relative">
        <Image
          fill
          alt={`jobo user ${user.username}`}
          src={user.profilePicture!}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p>{user.username}</p>
        <p>{content.title}</p>
      </div>
    </div>
  );
};

export default Post;
