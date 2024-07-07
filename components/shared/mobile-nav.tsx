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
    <div className="fixed bottom-0 h-20 flex-center border-t w-full lg:hidden px-10 bg-white z-50">
      <ul className="flex flex-between w-full ">
        {routes
          .filter(
            (route) =>
              !(user.type === "ADMIN" && ["/contact"].includes(route.path)) &&
              !(user.type !== "ADMIN" && ["/manage"].includes(route.path))
          )
          .map((route, index) => {
            const href =
              user.type === "ADMIN" && index === 0 ? "/panel" : route.path;
            const isActive =
              pathname === href ||
              (pathname !== "/" && pathname.startsWith(href + "/"));

            return (
              <Link
                href={route.path}
                key={route.name}
                className={cn("flex-center flex-col group text-background/80", {
                  "text-background font-semibold": isActive,
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
