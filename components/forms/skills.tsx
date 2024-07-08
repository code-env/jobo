"use client";

import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { softwareEngineerSkills } from "@/constants";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { User } from "@prisma/client";
import { Loading } from "../shared/loading";

const UserSkills = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const router = useRouter();

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const updateSkills = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (selectedSkills.length === 0) throw new Error("Select user Type");

      const res = await axios.put("/api/user", { skills: selectedSkills });

      const data: User = await res.data;

      if (data.type === "USER") router.push("/scroll");
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={updateSkills}
      className="flex items-center flex-col gap-10 border border-border p-10 rounded-lg transition-all duration-300 max-w-xl"
    >
      <p className="font-semibold text-3xl">Select your skills</p>
      <div className="flex flex-wrap gap-2">
        {softwareEngineerSkills.map((skill, index) => {
          //

          return (
            <p
              key={index}
              onClick={() => toggleSkill(skill)}
              className={cn(
                "p-2 font-semibold transition-all duration-150 hover:bg-black/10 cursor-pointer rounded-lg capitalize",
                {
                  "bg-black/10": selectedSkills.includes(skill),
                }
              )}
            >
              {skill}
            </p>
          );
        })}
      </div>

      <Button variant="zbtn">
        {isLoading ? (
          <>
            <Loading /> <span className="ml-2">Proceeding</span>
          </>
        ) : (
          "Proceed to dash"
        )}
      </Button>
    </form>
  );
};

export default UserSkills;
