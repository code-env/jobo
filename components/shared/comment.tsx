import { Comments, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Comment = ({ comment }: { comment: Comments }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/user/${comment.userId}`);

      setUser(data);
    };

    getUser();
  }, []);

  return (
    <div className="flex gap-3 py-2" key={comment.id}>
      <div className="w-10 h-10 min-w-10 relative rounded-full overflow-hidden">
        <Image
          fill
          alt={`jobo user ${user?.username}`}
          src={user?.profilePicture!}
        />
      </div>
      <div className="flex flex-col w-full">
        <p className="flex flex-col">{user?.username}</p>
        <p className="">{comment.message}</p>
      </div>
    </div>
  );
};

export default Comment;
