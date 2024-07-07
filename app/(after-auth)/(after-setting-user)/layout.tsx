import Mobileheadernav from "@/components/shared/mobile-header-nav";
import MobileNav from "@/components/shared/mobile-nav";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/hooks/use-user";
import { User } from "@prisma/client";
import React, { ReactNode } from "react";

const AfterAuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await useUser();

  if (!user) return;

  return (
    <div className="min-h-screen flex ">
      <Sidebar user={user} />
      <div className="flex-1">
        <Navbar />
        <MobileNav user={user} />
        <Mobileheadernav />
        <main className="children">
          <ScrollArea className="w-full h-full page relative">
            {children}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
};

export default AfterAuthLayout;
