"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="w-full flex justify-center mt-6 mb-10 px-4">
      <header className="w-[70vw] rounded-full bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Resume<span className="text-gray-800">Builder</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-6">
            <Link
              href="/templates"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Templates
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Dashboard
            </Link>
          </div>

          {/* Auth / User Section */}
          <div>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
      </header>
    </div>
  );
}
