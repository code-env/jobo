import React from "react";

import SelectUserType from "@/components/forms/user-type";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User-Type",
};

const UserType = () => {
  return <SelectUserType />;
};

export default UserType;
