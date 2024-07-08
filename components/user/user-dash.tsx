"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostSkeleton from "../skeletons/hacks-post";
import { toast } from "sonner";
import Post from "../shared/post";
import axios from "axios";
import { ShowCasePost } from "@prisma/client";

const UserDash = () => {
  async function getAllHacks() {
    try {
      const res = await axios.get("/api/user/showcase");

      const data: ShowCasePost[] = await res.data;

      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  }

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
    <div className="flex-col flex gap-4">
      {hacks?.map((hack) => (
        <Post content={hack!} key={hack.id} />
      ))}
    </div>
  );
};

export default UserDash;
