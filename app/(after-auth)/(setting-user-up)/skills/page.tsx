import UserSkills from "@/components/forms/skills";
import { useUser } from "@/hooks/use-user";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "Skills",
};

const SkillsPage = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.skills.length === 0 && user.type === "USER") return <UserSkills />;

  if (user.type === "ADMIN") return redirect("/d");

  return redirect("/d");
};

export default SkillsPage;
