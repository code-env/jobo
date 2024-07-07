import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";
import React from "react";

const SkillsPage = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.skills.length === 0 && user.type === "USER")
    return <div>SkillsPage</div>;

  return redirect("/d");
};

export default SkillsPage;
