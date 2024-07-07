"use client";

import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Loading } from "../shared/loading";
import { UserType } from "@prisma/client";

const userRoles: UserType[] = ["USER", "ADMIN", "OUTSOURCER"];

const SelectUserType = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<UserType>("USER");

  const handleChangeUserType = (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      if (!userType) throw new Error("Select user Type");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="flex items-center" onSubmit={handleChangeUserType}>
      {userRoles.map((role, index) => (
        <p key={index} onClick={() => setUserType(role)}>
          {role}
        </p>
      ))}

      <Button>
        {isLoading ? (
          <>
            <Loading /> <span>loading</span>
          </>
        ) : (
          "Change role"
        )}
      </Button>
    </form>
  );
};

export default SelectUserType;
