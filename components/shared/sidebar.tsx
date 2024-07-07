"use client";

import React from "react";
import Logo from "./logo";
import { sidebarRoutes } from "@/constants";
import SideItem from "./sidebar-item";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

const Sidebar = ({ user }: { user: User }) => {
  const routes = sidebarRoutes();
  const pathname = usePathname();

  const date = new Date().getFullYear();
  return (
    <aside className="lg:border-r pr-4 max-w-[211px] w-full flex-between flex-col pb-4 hidden lg:flex pl-4 2xl:pl-0 h-screen sticky top-0">
      <div className="flex flex-1 flex-col gap-16">
        <div className="h-[56px] flex  items-center">
          <Logo />
        </div>
        <ul>
          {routes
            .filter((route) => {
              return (
                !(user.type === "ADMIN" && ["/contact"].includes(route.path)) &&
                !(user.type !== "ADMIN" && ["/manage"].includes(route.path))
              );
            })
            .map((route, index) => {
              const href =
                user.type === "ADMIN" && index === 0 ? "/panel" : route.path;
              const isActive = pathname.startsWith(href);

              return (
                <SideItem
                  name={route.name}
                  iconImage={route.icon}
                  path={href}
                  isActive={isActive}
                  key={href}
                />
              );
            })}
        </ul>
      </div>

      <p>
        &copy; <span>TiC Summit {date}</span>
      </p>
    </aside>
  );
};

export default Sidebar;
