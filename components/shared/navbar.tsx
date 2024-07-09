"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, User as UserProfile } from "@prisma/client";
import Logo from "@/components/shared/logo";

import CreateNewHack from "../modals/create-hack";
import axios from "axios";
import AlertNav from "./alert-nav";

const Navbar = ({ user }: { user: User }) => {
  const [areconnects, setArrconnects] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const checkuserconnects = async () => {
    const res = await axios.get("/api/user/connections");
    if (res.data.statusCode === 200) {
      console.log(res.data);
    }
    if (res.data.connections >= 10) {
      setArrconnects(false);
    }
  };

  return (
    <header className="h-14 border-b border-border items-center flex px-4 justify-between">
      <div className="block lg:hidden">
        <Logo href="#" />
      </div>

      <p className="hidden lg:block capitalize font-semibold text-xl">
        {pathname.split("/")[1]}
      </p>

      <div className="block lg:hidden">
        <CreateNewHack />
      </div>

      {/* {areconnects && <p>Oops. All 10 free Posts Exhasuted.< DialogDemo/> more connects</p>} */}
      <div className="block lg:hidden">
        <AlertNav user={user} navbar />
      </div>
    </header>
  );
};

export default Navbar;
