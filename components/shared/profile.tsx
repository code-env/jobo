"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = ({
  imageUrl,
  fallBackText,
  className,
}: {
  imageUrl: string;
  fallBackText?: string;
  className?: string;
}) => {
  return (
    <Avatar className="bg-transparent h-full w-full">
      <AvatarImage
        src={imageUrl}
        alt="user Image"
        className="bg-transparent h-full w-full object-cover hover:opacity-90 slowmo"
      />
      <AvatarFallback className="bg-transparent font-semibold uppercase">
        {fallBackText}
      </AvatarFallback>
    </Avatar>
  );
};

export default Profile;
