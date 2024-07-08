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
    <aside className="lg:border-r max-w-[211px] w-full flex-between flex-col pb-4 hidden lg:flex 2xl:pl-0 h-screen sticky top-0">
      <div className="flex flex-1 flex-col gap-16">
        <div className="h-[56px] flex  items-center border-b border-border">
          <Logo href="/scroll" />
        </div>
        <ul className="px-4">
          {routes.map((route) => {
            const isActive = pathname === route.path;

            return (
              <SideItem
                key={route.name}
                isActive={isActive}
                name={route.name}
                path={route.path}
                iconImage={route.icon}
              />
            );
          })}
        </ul>
      </div>
      <p>
        &copy; <span>Jobo {date}</span>
      </p>
    </aside>
  );
};

export default Sidebar;
