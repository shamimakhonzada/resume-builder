"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { motion } from "framer-motion";
import { Edit, Palette, Download, Users, Star, Zap } from "lucide-react";

export default function Home() {
  // List of videos from your /public/assets folder
  const videos = ["/assets/job1.mp4", "/assets/job2.mp4", "/assets/job3.mp4", "/assets/job4.mp4"];

  // Track which video is currently playing
  const [currentVideo, setCurrentVideo] = useState(0);

  // Switch video every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [videos.length]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Video */}
      <section className="relative w-full h-screen flex items-center justify-center text-center">
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
          className="relative z-10 px-6 text-white max-w-3xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Build a <span className="text-blue-400">Professional Resume</span> in Minutes
          </motion.h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Create, customize, and export stunning resumes effortlessly. Save
            multiple versions, pick from templates, and land your dream job faster.
          </motion.p>

          <motion.div
            className="mt-8 flex gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition transform hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/templates"
              className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-xl shadow hover:bg-blue-50 transition transform hover:scale-105"
            >
              View Templates
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-800">Easy Editing</h3>
            <p className="mt-2 text-gray-600">
              A simple editor to create and update resumes without any hassle.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-800">Modern Templates</h3>
            <p className="mt-2 text-gray-600">
              Choose from professionally designed resume templates that stand out.
            </p>
          </div>
          <div className="p-6 rounded-2xl shadow hover:shadow-lg transition bg-blue-50">
            <h3 className="text-xl font-semibold text-gray-800">Export & Share</h3>
            <p className="mt-2 text-gray-600">
              Download your resume as PDF or share it online instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

