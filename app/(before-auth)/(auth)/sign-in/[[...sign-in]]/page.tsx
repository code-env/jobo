import { SignIn } from "@clerk/nextjs";
import React from "react";

const SignInPage = () => {
  return <SignIn signUpFallbackRedirectUrl="/user-type" />;
};

export default SignInPage;
