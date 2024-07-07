import React, { ReactNode } from "react";

const SettingUserUpLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      {children}
    </div>
  );
};

export default SettingUserUpLayout;
