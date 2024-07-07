import React from "react";

import SelectUserType from "@/components/forms/user-type";
import { Metadata } from "next";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "User-Type",
};

const UserType = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.type) return redirect("/skills");

  return <SelectUserType />;
};

export default UserType;
