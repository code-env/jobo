"use client";

import { AlignJustify, Bell, ChevronRight, LogOut, X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { User as UserProfile } from "@prisma/client";

import Logo from "./logo";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Mobileheadernav = () => {
  return (
    <header className="flex-center h-[56px] sticky top-0 flex-between border-b px-10 lg:hidden "></header>
  );
};

export default Mobileheadernav;
