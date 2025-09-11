"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full flex justify-center mt-6 mb-10 px-4">
      <header className="w-full max-w-7xl rounded-full bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-2">
          {/* Logo / Brand */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Resume<span className="text-gray-800">Builder</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600 transition"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <div
            className={`md:flex space-x-6 ${
              isOpen
                ? "flex flex-col space-y-2 mt-4 md:mt-0 md:flex-row md:space-y-0 absolute md:relative top-full left-0 md:top-auto md:left-auto w-full md:w-auto bg-white/70 md:bg-transparent rounded-b-full md:rounded-none px-6 md:px-0 py-4 md:py-0 shadow-md md:shadow-none"
                : "hidden"
            }`}
          >
            <Link
              href="/templates"
              className="text-gray-700 hover:text-blue-600 transition block md:inline"
              onClick={() => setIsOpen(false)}
            >
              Templates
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition block md:inline"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </div>

          {/* Auth / User Section */}
          <div className="hidden md:block">
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

        {/* Mobile Auth Section */}
        {isOpen && (
          <div className="md:hidden px-6 pb-4">
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
        )}
      </header>
    </div>
  );
}
