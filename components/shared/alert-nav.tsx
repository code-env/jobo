"use client";

import { Bell, User } from "lucide-react";
import { User as UserProfile } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { alertRoutes } from "@/constants";
import Profile from "./profile";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const AlertNav = ({ user }: { user: UserProfile }) => {
  const routes = alertRoutes();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = () => {
    signOut(() => router.push("/sign-in"));
  };

  return (
    <div className=" h-[56px] border-b px-6 flex-center gap-4 justify-between w-full">
      <div className="custom-input-parent h-8 max-w-[200px]">
        <input className="custom-input" placeholder="Search..." />
      </div>
      <div className="gap-2 flex">
        <Link
          href="/notifications"
          className="h-8 w-8 center border rounded-full cursor-pointer"
        >
          <Bell className="h-4 w-4" />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-8 w-8 center border rounded-full cursor-pointer relative overflow-hidden">
              <Profile
                imageUrl={user.profilePicture!}
                // fallBackText={fallBackText}
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60" align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white border-b" />
            <DropdownMenuGroup>
              {routes.map((route, index) => {
                if (!user) return;

                const href = index === 0 ? `/${user.username!}` : route.path;

                return (
                  <Link href={href} key={route.name}>
                    <DropdownMenuItem className="cursor-pointer">
                      <route.icon className="mr-2 h-4 w-4" />
                      <span>{route.name}</span>
                      <DropdownMenuShortcut>
                        ⇧⌘{route.keys}
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </Link>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-white border-b" />
            <DropdownMenuItem
              onClick={handleSignOut}
              className="cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default AlertNav;
