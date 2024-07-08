import React from "react";

import AlertNav from "./alert-nav";
import Conversations from "@/components/messages/conversation";
import { useUser } from "@/hooks/use-user";

const Alerts = async () => {
  const user = await useUser();

  if (!user) return;

  return (
    <div className="lg:border-r border-l max-w-[348px] w-full lg:flex hidden flex-col">
      <AlertNav user={user} />
      <div className="flex-1 ">
        <Conversations />
      </div>
    </div>
  );
};

export default Alerts;
