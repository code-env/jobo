import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const LineText = ({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) => {
  return (
    <div className="flex items-center mt-4 mb-6">
      <div className="flex-grow border-b border-gray-300 w-full" />
      {children && <div className="mx-auto w-full">{children}</div>}
      <div className="flex-grow border-b border-gray-300 w-full" />
    </div>
  );
};
export default LineText;
