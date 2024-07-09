import AssesmentForm from "@/components/forms/assesment-form";
import { useUser } from "@/hooks/use-user";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await useUser();

  if (!user) return;

  if (!user.visible) return <AssesmentForm user={user} />;

  if (user.visible) return redirect("/scroll");
};

export default Page;
