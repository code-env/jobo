import { cn } from "@/lib/utils";
import { ShowCasePost, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Post = ({ content }: { content: ShowCasePost }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isTrue, setIsTrue] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/user/${content.userId}`);

      setUser(data);
    };

    getUser();
  }, []);

  if (!user) return;

  return (
    <div className="flex gap-3">
      <div className="w-10 h-10 min-w-10 relative rounded-full overflow-hidden">
        <Image
          fill
          alt={`jobo user ${user?.username}`}
          src={user?.profilePicture!}
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="flex flex-col">
          {user?.username}{" "}
          <span className="text-xs text-neutral-400">
            {new Date(content.createdAt).toLocaleDateString()}
          </span>
        </p>

        <p className="mt-2 line-clamp-3 mb-2">{content.description}</p>

        <div className="flex w-full relative ">
          {isTrue && (
            <div className="w-[200px] h-28 rounded-lg bg-black/5 absolute right-0 flex items-center justify-center">
              <span className="font-semibold">
                {content.images.length - 3} +
              </span>
            </div>
          )}
          {content.images?.map((image, index) => {
            //some code here

            if (content.images.length > 3) {
              setIsTrue(true);
            }
            return (
              <div
                key={index}
                className={cn(
                  "h-28 flex-1 max-w-[200px] w-[200px] border rounded-lg relative"
                )}
              >
                <Image
                  src={image}
                  alt="Nothing for now"
                  fill
                  className="object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
