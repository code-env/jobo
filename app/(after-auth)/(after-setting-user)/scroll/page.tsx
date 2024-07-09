import OutsourcerDash from "@/components/outsourcer/dasboard";
import UserDash from "@/components/user/user-dash";
import { useUser } from "@/hooks/use-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Scroll",
};

const Dasboard = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.type === "USER" && user.visible) return <UserDash user={user} />;

  if (user.type === "USER" && !user.visible) return redirect("/assesments");

  if (user.type === "OUTSOURCER") return <OutsourcerDash user={user} />;
};

export default Dasboard;
