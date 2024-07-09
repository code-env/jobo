import SinglePost from "@/components/shared/single-post";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const ScrollPost = async ({ params }: { params: { scrollId: string } }) => {
  const post = await db.showCasePost.findUnique({
    where: {
      id: params.scrollId,
    },
    select: {
      Comments: true,
      likescount: true,
      images: true,
      title: true,
      description: true,
      createdAt: true,
      id: true,
      user: true,
    },
  });

  if (!post) return <div className="children center">Post not found</div>;

  return (
    <div className="children">
      <div className="page border-b border-border flex flex-col gap-3">
        <div className="flex gap-2">
          <div className="w-10 h-10 min-w-10 relative rounded-full overflow-hidden">
            <Image
              fill
              alt={`jobo user ${post?.user.username}`}
              src={post.user.profilePicture!}
            />
          </div>
          <p className="flex flex-col">
            {post.user?.username}{" "}
            <span className="text-xs text-neutral-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div>
          <h2 className="font-semibold text-3xl">{post.title}</h2>

          <p className="mt-2 mb-2">{post.description}</p>

          <div className="flex w-full flex-col relative">
            {post.images?.map((image, index) => {
              //some code here
              return (
                <div
                  key={index}
                  className={cn(
                    "h-96 w-full overflow-hidden  border rounded-lg relative"
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
      <SinglePost
        Comments={post.Comments}
        images={post.images}
        id={post.id}
        likeCount={post.likescount}
        user={post.user}
      />
    </div>
  );
};

export default ScrollPost;
