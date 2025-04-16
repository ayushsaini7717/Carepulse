"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "@/app/styles/admin-dashboard.css";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen background text-white relative">
      <nav className="flex justify-between items-center p-6 shadow-md bg-black bg-opacity-50">
        <div className="text-2xl font-bold text-red-500">
          <img src="/Logo.svg" alt="Logo" className="h-[32px] w-[162px]" />
        </div>
        <div>
          <button
            onClick={() => router.push("/HospitalRegistration")}
            className="bg-gray-300 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-200"
          >
            Hospital Registration
          </button>
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Connecting Healthcare <br /> Providers with Patients
          </h1>
          <p className="text-gray-200 text-lg">
            A unified platform designed to bridge the gap between patients and
            healthcare providers, allowing hospitals to manage registrations
            while patients easily access care and book appointments.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/UserLogin")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Patient Login
            </button>
            <button
              onClick={() => router.push("/hospital-login")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
            >
              Hospital Login
            </button>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src="/landingimage.jpg"
              alt="Doctor and Patient"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <footer className="bg-black mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-semibold">CarePulse</span>. All
            rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

      <button
        onClick={() => router.push("/chatbot")}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-all duration-300"
        aria-label="Open Chatbot"
        title="Chat with Careplus"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3.75h6M12 21a9 9 0 100-18 9 9 0 000 18z"
          />
        </svg>
      </button>
    </div>
  );
}
