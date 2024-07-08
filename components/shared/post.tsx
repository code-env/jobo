import { useFindUser } from "@/hooks/use-find-user";
import { ShowCasePost, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Post = ({ content }: { content: ShowCasePost }) => {
  const [user, setUser] = useState<User | null>(null);
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
      <div className="w-12 h-12 min-w-12 relative rounded-full overflow-hidden">
        <Image
          fill
          alt={`jobo user ${user?.username}`}
          src={user?.profilePicture!}
        />
      </div>
      <div className="flex flex-col">
        <p>{user?.username}</p>
        {/* <p>{Date(content.createdAt)}</p> */}

        <p className="mt-2 line-clamp-3">{content.description}</p>

        <div className="flex w-full">
          {content.images?.map((image, index) => {
            //some code here

            return (
              <div
                key={index}
                className="h-28 flex-1 max-w-[200px] w-full border rounded-lg relative"
              >
                <Image src={image} alt="Nothing for now" fill />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
