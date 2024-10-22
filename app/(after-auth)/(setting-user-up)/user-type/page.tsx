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

  if (user.type === "NONE") return <SelectUserType />;

  if (user.type === "ADMIN") return;

  if (user.type === "USER") return redirect("/skills");

  if (user.type === "OUTSOURCER") return redirect("/scroll");
};

export default UserType;
