"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Edit, Palette, Download, Users, Star, Zap } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Home() {
  const videos = [
    "/assets/job1.mp4",
    "/assets/job2.mp4",
    "/assets/job3.mp4",
    "/assets/job4.mp4",
  ];

  const [currentVideo, setCurrentVideo] = useState(0);

  // Switch video every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Video */}
      <section className="relative w-full min-h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        {/* Background Video */}
        <video
          key={currentVideo}
          className="absolute inset-0 w-full min-h-screen object-cover transition-opacity duration-700 pointer-events-none"
          autoPlay
          muted
          playsInline
          aria-hidden="true"
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/40"></div>

        {/* Navbar */}
        <div className="absolute top-0 left-0 w-full">
          <Navbar />
        </div>

        {/* Hero Content */}
        <div className="relative z-30 text-white max-w-3xl px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Build a <span className="text-blue-400">Professional Resume</span>{" "}
            in Minutes
          </h1>
          <p className="mt-6 text-base sm:text-lg md:text-xl landscape:text-2xl text-gray-200 max-w-2xl landscape:max-w-4xl mx-auto">
            Create, customize, and export stunning resumes effortlessly. Save
            multiple versions, pick from templates, and land your dream job
            faster.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <SignedOut>
              <Link href="/signin">
                <Button
                  className="text-[16px] px-5 py-2.5 transition-all "
                  size={"lg"}
                >
                  Get Started
                </Button>
              </Link>
              <Link href="/signin">
                <Button
                  className="text-[16px] px-5 py-2.5 transition-all "
                  variant={"secondary"}
                  size={"lg"}
                >
                  View Templates
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button className="text-[16px] px-5 py-2.5 transition-all ">
                  Get Started
                </Button>
              </Link>
              <Link href="/template">
                <Button
                  className="text-[16px] px-5 py-2.5 transition-all "
                  variant="secondary"
                >
                  View Templates
                </Button>
              </Link>
            </SignedIn>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Features</h2>
            <p className="mt-4 text-base text-gray-600">
              Everything you need to create the perfect resume.
            </p>
          </div>
          <div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-2xl shadow-lg text-center">
              <Edit className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                Easy Editing
              </h3>
              <p className="mt-2 text-gray-600">
                A simple editor to create and update resumes without any hassle.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-lg text-center">
              <Palette className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                Modern Templates
              </h3>
              <p className="mt-2 text-gray-600">
                Choose from professionally designed resume templates that stand
                out.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-2xl shadow-lg text-center">
              <Download className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                Export & Share
              </h3>
              <p className="mt-2 text-gray-600">
                Download your resume as PDF or share it online instantly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-blue-50 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-base text-gray-600">
            Our platform is designed to provide the best resume-building
            experience.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6">
              <Users className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                User-Friendly
              </h3>
              <p className="mt-2 text-gray-600">
                Intuitive interface for a seamless experience.
              </p>
            </div>
            <div className="p-6">
              <Star className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                Top Quality
              </h3>
              <p className="mt-2 text-gray-600">
                Create resumes that meet the highest industry standards.
              </p>
            </div>
            <div className="p-6">
              <Zap className="mx-auto h-12 w-12 text-blue-600" />
              <h3 className="mt-6 text-xl font-semibold text-gray-800">
                Fast & Efficient
              </h3>
              <p className="mt-2 text-gray-600">
                Build and download your resume in just a few clicks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
