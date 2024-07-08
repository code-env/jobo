import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="flex gap-3 page">
      <Skeleton className="w-12 h-12 min-w-12 rounded-full" />
      <div className="flex-1 mt-1 flex flex-col gap-2">
        <Skeleton className="w-36 h-2 min-w-10" />
        <div className=" flex flex-col gap-1">
          <Skeleton className="w-1/3 h-2 min-w-10" />
          <Skeleton className="w-2/3 h-2 min-w-10" />
          <Skeleton className="w-full h-2 min-w-10" />
        </div>
        <div className="flex justify-end gap-3">
          <Skeleton className="flex-1 h-28 rounded-lg" />
          <Skeleton className="flex-1 h-28 rounded-lg" />
          <Skeleton className="flex-1 h-28 rounded-lg" />
        </div>
        <div className=" flex flex-col gap-2">
          <div className="flex gap-2">
            <Skeleton className="w-1/4 h-2 min-w-10" />
            <Skeleton className="w-3/4 h-2 min-w-10" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="w-1/4 h-2 min-w-10" />
            <Skeleton className="w-3/4 h-2 min-w-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostSkeleton;
