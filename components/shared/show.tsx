import { User } from "@prisma/client";
import Image from "next/image";
import React from "react";
import CreateNewHack from "../modals/create-hack";

const Show = ({ user }: { user: User }) => {
  return (
    <div className="px-6 py-2 border-b border-border flex justify-between">
      <div className="w-10 h-10 min-w-10 relative rounded-full overflow-hidden">
        <Image
          fill
          alt={`jobo user ${user.username}`}
          src={user.profilePicture!}
        />
      </div>

      <CreateNewHack />
    </div>
  );
};

export default Show;
