"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/templates", label: "Templates" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About Us" },
  { href: "/pricing", label: "Pricing" },
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
        <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600">
          Resume<span className="text-gray-800">Builder</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-base lg:text-lg"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden lg:flex items-center space-x-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition-all font-medium">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>

        {/* Mobile Menu Button */}
        <button
          ref={buttonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-muted-foreground hover:text-primary p-2 rounded-md hover:bg-accent transition"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-4 py-4 border-t border-border/20 bg-card/90 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 font-medium text-base"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-4 mt-4">
            <SignedIn>
              <div className="w-full">
                <UserButton afterSignOutUrl="/" />
              </div>
              <Link href="/dashboard" className="w-full">
                <button
                  className="w-full px-5 py-2.5 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </button>
              </Link>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="w-full px-5 py-2.5 bg-primary text-primary-foreground rounded-lg shadow-sm hover:bg-primary/90 transition-all font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
      </header>
    </div>
  );
}
