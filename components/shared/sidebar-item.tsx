import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const SideItem = ({
  name,
  iconImage,
  path,
  isActive,
}: {
  name: string;
  iconImage: LucideIcon;
  path: string;
  isActive: boolean;
}) => {
  const Icon = iconImage;
  return (
    <Link
      href={path}
      className={cn("flex-center gap-2 py-2 group text-background/80", {
        "text-background font-semibold": isActive,
      })}
    >
      <Icon /> <span className="group-hover:pl-2 slowmo">{name}</span>
    </Link>
  );
};

export default SideItem;
