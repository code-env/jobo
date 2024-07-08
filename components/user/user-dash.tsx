"use client";

import { getAllHacks } from "@/actions/hacks";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostSkeleton from "../skeletons/hacks-post";
import { toast } from "sonner";
import Post from "../shared/post";

const UserDash = () => {
  const {
    isLoading,
    data: hacks,
    isError,
  } = useQuery({
    queryKey: ["hacks"],
    queryFn: getAllHacks,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <PostSkeleton key={index} />
        ))}
      </div>
    );

  if (hacks?.length === 0) return <div className="">No hacks!</div>;

  if (isError) return toast.error("something bad happened");

  return (
    <div>
      {hacks?.map((hack) => (
        <Post content={hack!} />
      ))}
    </div>
  );
};

export default UserDash;
