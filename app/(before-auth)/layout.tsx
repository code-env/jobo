import React, { ReactNode } from "react";

const BeforeAuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      {children}
    </div>
  );
};

export default BeforeAuthLayout;
