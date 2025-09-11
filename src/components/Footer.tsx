"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`transition transform hover:scale-110 hover:${hoverColor}`}
    >
      {icon}
    </a>
  );
};

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children }) => {
  return (
    <li>
      <Link
        href={href}
        className="hover:underline text-gray-400 hover:text-gray-100 transition"
      >
        {children}
      </Link>
    </li>
  );
};

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-gray-900 via-black to-black text-gray-300 pt-16 pb-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2">
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/templates">Templates</FooterLink>
            <FooterLink href="/dashboard">Dashboard</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">About Us</h3>
          <p className="text-gray-400 leading-relaxed text-sm">
            We help you craft professional resumes with ease. Choose from modern
            templates, customize, and export your resume in minutes.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Services</h3>
          <ul className="space-y-2">
            <FooterLink href="/services/resume-building">
              Resume Building
            </FooterLink>
            <FooterLink href="/services/templates">Resume Templates</FooterLink>
            <FooterLink href="/services/ai-suggestions">
              AI Suggestions
            </FooterLink>
          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="font-bold text-xl mb-4 text-white">Contact Us</h3>
          <p className="mb-4 text-gray-400 text-sm">
            123 Resume Street, Tech City
          </p>
          <div className="flex gap-5">
            <SocialLink
              href="https://facebook.com"
              icon={<Facebook size={24} />}
              hoverColor="text-blue-500"
            />
            <SocialLink
              href="https://twitter.com"
              icon={<Twitter size={24} />}
              hoverColor="text-sky-400"
            />
            <SocialLink
              href="https://instagram.com"
              icon={<Instagram size={24} />}
              hoverColor="text-pink-500"
            />
            <SocialLink
              href="https://linkedin.com"
              icon={<Linkedin size={24} />}
              hoverColor="text-blue-600"
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-12 border-t border-gray-800" />

      {/* Bottom */}
      <div className="pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">ResumeBuilder</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
