"use client";

import { cn } from "@/lib/utils";
import { Comments, Likes, User } from "@prisma/client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import React, { FormEvent, useState } from "react";
import Comment from "./comment";

export type Post = {
  id: string;
  Comments: Comments[];

  likeCount: number;
  images: string[];
};

const SinglePost = ({ id, Comments }: Post) => {
  const [text, setText] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmitComments = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setisLoading(true);

      const { data } = await axios.post(`/api/user/showcase/${id}/comments`, {
        message: text,
      });

      setText("");

      revalidatePath("/scroll");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="">
      <div className="page border-border border-b">
        <form
          className="flex items-center gap-3"
          onSubmit={handleSubmitComments}
        >
          <input
            placeholder="Comment here..."
            className={cn(
              "h-10 w-full border border-border rounded-lg outline-none px-5",
              {
                "opacity-50 cursor-not-allowed": isLoading,
              }
            )}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className={cn(
              "bg-primary px-3 py-1.5 text-white rounded-lg font-semibold capitalize",
              {
                "opacity-50 cursor-not-allowed": isLoading,
              }
            )}
          >
            send
          </button>
        </form>
      </div>
      <div className="page border-border border-b">
        {Comments.map((comment) => (
          <Comment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  );
};

export default SinglePost;
