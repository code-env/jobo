import Alerts from "@/components/shared/alert";
import MobileNav from "@/components/shared/mobile-nav";
import Navbar from "@/components/shared/navbar";
import Sidebar from "@/components/shared/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUser } from "@/hooks/use-user";
import QueryProvider from "@/providers/query";
import React, { ReactNode } from "react";

const AfterAuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = await useUser();

  if (!user) return;

  return (
    <div className="min-h-screen flex max-w-7xl mx-auto w-full">
      <Sidebar user={user} />
      <div className="flex-1">
        <Navbar user={user} />
        <MobileNav user={user} />
        {/* <Mobileheadernav /> */}
        <main className="children">
          <ScrollArea className="w-full h-full relative">
            <QueryProvider>{children}</QueryProvider>
          </ScrollArea>
        </main>
      </div>

      <Alerts />
    </div>
  );
};

export default AfterAuthLayout;
