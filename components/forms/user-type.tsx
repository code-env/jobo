"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Loading } from "../shared/loading";
import { User, UserType } from "@prisma/client";
import { cn } from "@/lib/utils";
import axios from "axios";
import { useRouter } from "next/navigation";

const userRoles: UserType[] = ["USER", "OUTSOURCER"];

const SelectUserType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("USER");
  const router = useRouter();

  const handleChangeUserType = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (!userType) throw new Error("Select user Type");

      const res = await axios.put("/api/user", { type: userType });

      const data: User = await res.data;

      if (data.type === "USER") router.push("/skills");
      if (data.type === "OUTSOURCER") router.push("/scroll");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex items-center flex-col max-w-xl gap-10 border border-border p-10 rounded-lg transition-all duration-300"
      onSubmit={handleChangeUserType}
    >
      <p className="font-semibold text-3xl">Who are you?</p>
      <div className="flex gap-5">
        {userRoles.map((role, index) => (
          <p
            key={index}
            onClick={() => setUserType(role)}
            className={cn(
              "p-2 font-semibold transition-all duration-150 hover:bg-black/10 cursor-pointer rounded-lg capitalize",
              {
                "bg-black/10": role === userType,
              }
            )}
          >
            {role}
          </p>
        ))}
      </div>

      {userType === "OUTSOURCER" && (
        <p className="text-center">
          This means you&apos;re just a company or someone wanting to offer
          opportunities
        </p>
      )}

      <Button variant="zbtn">
        {isLoading ? (
          <>
            <Loading /> <span className="ml-2 ">Continuing</span>
          </>
        ) : (
          "Next"
        )}
      </Button>
    </form>
  );
};

export default SelectUserType;
