"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

const NAV_LINKS = [
  { href: "/templates", label: "Templates", roles: ["user", "admin"] },
  { href: "/dashboard", label: "Dashboard", roles: ["user", "admin"] },
  { href: "/about", label: "About Us", roles: ["user", "admin"] },
  { href: "/pricing", label: "Pricing", roles: ["user", "admin"] },
  { href: "/admin", label: "Set Role", roles: ["admin"] }, // only admins
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { user } = useUser();
  const role = (user?.publicMetadata?.role as string) || "user";

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

  // filter links by role
  const filteredLinks = NAV_LINKS.filter((link) => link.roles.includes(role));

  return (
    <div className="w-full flex justify-center mt-6 mb-10 px-4">
      <header className="w-full max-w-7xl rounded-2xl bg-card/70 backdrop-blur-md shadow-lg border border-border/20 sticky top-0 z-50">
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl sm:text-2xl font-bold text-blue-600"
          >
            Resume<span className="text-gray-800">Builder</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {filteredLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium text-base lg:text-lg relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-4">
            <SignedOut>
              <Link href={"/signin"}>
                <Button className="px-5 py-2.5 transition-all font-medium">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
          </div>

          <div className="flex justify-center items-center">
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-muted-foreground hover:text-primary p-3 rounded-lg hover:bg-accent transition-all duration-200 hover:scale-105"
              aria-expanded={isOpen}
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 px-6 py-6 border-t border-border/20 glass">
            <SignedIn>
              {filteredLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-all duration-200 font-medium text-base py-2 px-3 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </SignedIn>

            <div className="flex flex-col px-6 border-t border-border/20 glass">
              <SignedOut>
                <Link href={"/signin"}>
                  <Button
                    className="w-full px-5 py-2.5 transition-all font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Button>
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
