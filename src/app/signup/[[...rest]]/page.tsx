"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-6">
        <SignUp path="/signup" routing="path" signInUrl="/signin" />
      </div>
    </>
  );
}
