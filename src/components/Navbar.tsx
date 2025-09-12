"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="w-full flex justify-center mt-6 mb-10 px-4">
      <header className="w-full max-w-7xl rounded-2xl bg-card/70 backdrop-blur-md shadow-lg border border-border/20 sticky top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Resume<span className="text-gray-800">Builder</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden sm:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-lg sm:text-base"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden sm:block">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg transition-all font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden text-muted-foreground hover:text-primary p-2 rounded-lg hover:bg-accent transition"
            aria-expanded={isOpen}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-4 px-6 py-4 border-t border-border/20 bg-white/80 backdrop-blur-md rounded-b-2xl">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl shadow-md hover:bg-primary/90 hover:shadow-lg transition-all font-medium">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </header>
    </div>
  );
}
