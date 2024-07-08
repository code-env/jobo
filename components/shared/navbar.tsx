"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { User, User as UserProfile } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import CreateNewHack from "../modals/create-hack";

const Navbar = ({ user }: { user: User }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="h-14 border-b border-border items-center flex px-4 justify-between">
      <p>Navbar</p>

      <CreateNewHack />
    </header>
  );
};

export default Navbar;
