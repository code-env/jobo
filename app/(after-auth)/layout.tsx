import { useUser } from "@/hooks/user-user";
import React, { ReactNode } from "react";

const AfterAuthLayout = async ({ children }: { children: ReactNode }) => {
  const user = useUser();

  if (!user) return;

  return <div>{children}</div>;
};

export default AfterAuthLayout;
