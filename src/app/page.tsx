"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit, Palette, Download, Users, Star, Zap } from "lucide-react";

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
      <section className="relative w-full min-h-screen landscape:min-h-[70vh] flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        {/* Background Video */}
        <video
          key={currentVideo} // re-render when video changes
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          autoPlay
          muted
          playsInline
        >
          <source src={videos[currentVideo]} type="video/mp4" />
        </video>

        {/* Blue Overlay */}
        <div className="absolute inset-0 bg-blue-900/40"></div>

        {/* Navbar on top */}
        <div className="absolute top-0 left-0 w-full">
          <Navbar />
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-white max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl landscape:text-7xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build a <span className="text-blue-400">Professional Resume</span>{" "}
            in Minutes
          </motion.h1>
          <motion.p
            className="mt-6 text-base sm:text-lg md:text-xl landscape:text-2xl text-gray-200 max-w-2xl landscape:max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create, customize, and export stunning resumes effortlessly. Save
            multiple versions, pick from templates, and land your dream job
            faster.
          </motion.p>

          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/dashboard"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/templates"
              className="w-full sm:w-auto px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl shadow-lg hover:bg-blue-50 transition-transform transform hover:scale-105"
            >
              View Templates
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 landscape:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Features
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              Everything you need to create the perfect resume.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 landscape:grid-cols-4">
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

      {/* New Section */}
      <section className="py-16 sm:py-20 landscape:py-24 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600">
            Our platform is designed to provide the best resume-building
            experience.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 landscape:grid-cols-4">
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
