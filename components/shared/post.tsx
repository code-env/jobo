import { cn } from "@/lib/utils";
import { Comments, Likes, ShowCasePost, User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { ArrowBigUp, MessageSquareText } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect, useRouter } from "next/navigation";

const Post = ({
  params,
}: {
  params: { content: ShowCasePost; isoutsourcer: Boolean };
}) => {
  const [text, setText] = useState("");
  const [likes, setLikes] = useState<Likes[] | null>(null);
  const [comments, setComments] = useState<Comments[] | null>(null);
  const [isLoading, setisLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isCommment, setIsComment] = useState(false);
  const [isTrue, setIsTrue] = useState(false);

  const router = useRouter();

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

  const createChannel = async (userId: string) => {
    try {
      const { data } = await axios.post(
        `/api/conversation/create/${userId}/`,
        {}
      );

      if (data) {
        console.log("Channel creation success");
        router.push(`/inbox/${data.id}`);
      } else {
        console.log(userId, data);
        alert("Sorry, something happened. Please try again later.");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  if (!user) return;

  return (
    <div className="flex flex-col lg:flex lg:flex-row gap-3 border-border border-b page hover:bg-black/5 ">
      <div className="flex  gap-2">
        <div className="w-10 h-10 min-w-10 relative rounded-full overflow-hidden">
          <Image
            fill
            alt={`jobo user ${user.username}`}
            src={user.profilePicture!}
          />
        </div>
        <p className="flex flex-col lg:hidden">
          {user?.username}{" "}
          <span className="text-xs text-neutral-400">
            {new Date(params.content.createdAt).toLocaleDateString()}
          </span>
        </p>
      </div>
      <div className="w-fit">
        <p className="hidden flex-col lg:flex">
          {user?.username}{" "}
          <span className="text-xs text-neutral-400">
            {new Date(params.content.createdAt).toLocaleDateString()}
          </span>
        </p>

        <h2
          className="font-semibold text-xl lg:text-3xl"
          onClick={() => router.push(`/scroll/${params.content.id}`)}
        >
          {params.content.title}
        </h2>

        <p
          className="mt-2 line-clamp-3 mb-2"
          onClick={() => router.push(`/scroll/${params.content.id}`)}
        >
          {params.content.description}
        </p>
        <div className="flex relative ">
          {params.content.images?.map((image, index) => {
            if (params.content.images.length > 3) {
              setIsTrue(true);
            }
            return (
              <div
                key={index}
                className={cn(
                  "h-28 flex-1 max-w-[200px] w-[200px] border rounded-lg relative overflow-hidden"
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
            {params.isoutsourcer && (
              <button
                className="bg-green-500 text-white rounded-full p-1 px-2 flex items-center gap-1 text-black/50 hover:bg-black/20 slowmo"
                onClick={() => createChannel(params.content.userId)}
              >
                Inbox
              </button>
            )}
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
