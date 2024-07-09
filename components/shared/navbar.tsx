"use client";

import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { User, User as UserProfile } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import CreateNewHack from "../modals/create-hack";
import axios from "axios";

const Navbar = ({ user }: { user: User }) => {
  const [areconnects, setArrconnects] = useState(true)
  const router = useRouter();
  const pathname = usePathname();


  const checkuserconnects = async () => {
    const res = await axios.get("/api/user/connections");
    if(res.data.statusCode === 200) {
      console.log(res.data)
    }
    if(res.data.connections >=10){
      setArrconnects(false)
    }

    

  }

  return (
    <header className="h-14 border-b border-border items-center flex px-4 justify-between">
      <p>Navbar</p>

     
     <div>
{!areconnects && <p>max number of free post made. Buy more connects toc continue</p>}
      <CreateNewHack />
     </div>
     
    </header>
  );
};

export default Navbar;
