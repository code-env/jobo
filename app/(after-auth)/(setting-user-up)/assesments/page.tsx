import AssesmentForm from "@/components/forms/assesment-form";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await useUser();

  if (!user) return;

  if (user.skills.length === 0) return redirect("/skills");

  if (user.type === "OUTSOURCER") return redirect("/scroll");

  if (!user.visible) return <AssesmentForm user={user} />;

  if (user.visible) return redirect("/scroll");
};

export default Page;
