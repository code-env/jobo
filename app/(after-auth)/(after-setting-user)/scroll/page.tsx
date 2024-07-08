import OutsourcerDash from "@/components/outsourcer/dasboard";
import UserDash from "@/components/user/user-dash";
import { useUser } from "@/hooks/use-user";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Scroll",
};

const Dasboard = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.type === "USER") return <UserDash />;

  if (user.type === "OUTSOURCER") return <OutsourcerDash user={user} />;
};

export default Dasboard;
