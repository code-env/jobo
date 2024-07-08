"use client";

import { sidebarRoutes } from "@/constants";
import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";

const MobileNav = ({ user }: { user: User }) => {
  const routes = sidebarRoutes();
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 h-20 items-center flex border-t w-full lg:hidden px-10 bg-white z-50">
      <ul className="flex justify-between w-full items-center ">
        {routes.map((route) => {
          const isActive = pathname === route.path;

          return (
            <Link
              href={route.path}
              key={route.name}
              className={cn("flex flex-col items-center group", {
                "font-semibold": isActive,
              })}
            >
              <route.icon />
              <span className="sr-only sm:not-sr-only">{route.name}</span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileNav;
