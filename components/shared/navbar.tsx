"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { User as UserProfile } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<UserProfile | null | undefined>();

  return (
    <header className="h-14 border-b border-border items-center flex px-4">
      Navbar
    </header>
  );
};

export default Navbar;
