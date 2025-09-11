"use-client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
        <SignIn path="/signin" routing="path" signUpUrl="/signup" />;
      </div>
    </>
  );
}
