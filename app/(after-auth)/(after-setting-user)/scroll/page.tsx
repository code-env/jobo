import { useUser } from "@/hooks/use-user";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Scroll",
};

const Dasboard = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.type === "USER") return <div>Dasboard</div>;

  if (user.type === "OUTSOURCER") return <div>outsourcers</div>;
};

export default Dasboard;
