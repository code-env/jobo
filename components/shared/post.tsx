import { cn } from "@/lib/utils";
import { Comments, Likes, ShowCasePost, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { ArrowBigUp, MessageSquareText } from "lucide-react";
import { revalidatePath } from "next/cache";

const Post = ({ params }: { params: {content:ShowCasePost,isoutsourcer:Boolean}}) => {
  const [text, setText] = useState("");
  const [likes, setLikes] = useState<Likes[] | null>(null);
  const [comments, setComments] = useState<Comments[] | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCommment, setIsComment] = useState(false);
  const [isTrue, setIsTrue] = useState(false);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`/api/user/${params.content.userId}`);

      setUser(data);
    };

    getUser();
  }, []);

  useEffect(() => {
    const comments = async () => {
      const { data } = await axios.get(
        `/api/user/showcase/${params.content.id}/comments`
      );

      setComments(data);
    };

    comments();
  }, []);

  const handleSubmitComments = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setisLoading(true);

      const { data } = await axios.post(
        `/api/user/showcase/${params.content.id}/comments`,
        { message: text }
      );

      setComments([...(comments as Comments[]), data]);

      setText("");
      setIsComment(false);

      revalidatePath("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setisLoading(false);
    }
  };

  const handleLikePost = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setisLoading(true);
      setisLoading(true);

      const { data } = await axios.post(
        `/api/user/showcase/${params.content.id}/likes`
      );

      setLikes([...(likes as Likes[]), data]);

      // (false);

      revalidatePath("/");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setisLoading(false);
    }
  };

  if (!user) return;

  return (
    <div className="flex gap-3 border-border border-b page">
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
            {new Date(params.content.createdAt).toLocaleDateString()}
          </span>
        </p>

        <h2 className="font-semibold text-3xl">{params.content.title}</h2>


        <p className="mt-2 line-clamp-3 mb-2">{params.content.description}</p>

        <div className="flex w-full relative ">
          {isTrue && (
            <div className="w-[200px] h-28 rounded-lg bg-black/5 absolute right-0 flex items-center justify-center">
              <span className="font-semibold">
                {params.content.images.length - 3} +
              </span>
            </div>
          )}
          {params.content.images?.map((image, index) => {
            //some code here

            if (params.content.images.length > 3) {
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

        <div className="mt-5 ">
          <div className="flex gap-10">
            <button
              onClick={() => setIsComment(!isCommment)}
              className="bg-black/5 rounded-full p-1 px-2 flex items-center gap-1 text-black/50 hover:bg-black/20 slowmo"
            >
              <MessageSquareText className="w-4 h-4 x" />{" "}
              <span className="text-sm">{comments?.length}</span>
            </button>
            <button
              onClick={handleLikePost}
              className="bg-black/5 rounded-full p-1 px-2 flex items-center gap-1 text-black/50 hover:bg-black/20 slowmo"
            >
              <ArrowBigUp className="w-4 h-4 " />{" "}
              <span className="text-sm">{params.content.likescount}</span>
            </button>
            <button 
      className="bg-green-500 text-white rounded-full p-1 px-2 flex items-center gap-1 text-black/50 hover:bg-black/20 slowmo" 
      onClick={() => console.log(1)}>
     Inbox
    </button>
          </div>
          {isCommment && (
            <form
              className="mt-5 flex items-center gap-3"
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
