"use client";

import React, { useState } from "react";
import { Facebook, Instagram } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail("");
  };

  return (
    <footer style={{ backgroundColor: "#252525" }} className="text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Company */}
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase">Company</h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Team
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase">Contact</h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Help & Support
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Partner with us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Ride with us
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase">Legal</h3>
            <ul className="space-y-1.5">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Refund & Cancellation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-bold mb-3 uppercase">Follow Us</h3>
            <div className="flex gap-3 mb-4">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center  hover:bg-orange rounded transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center  hover:bg-orange rounded transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center hover:bg-orange rounded transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
            </div>
            <p className="text-gray-400 text-xs mb-3">
              Receive exclusive offers in your mailbox
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <div className="relative flex-1 ">
                  <img
                    src="/email-icon.png.png"
                    alt="Email"
                    className="absolute bg-gray-200 left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-3 py-2 rounded bg-gray-700 text-white placeholder-gray-500 outline-none text-sm focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="relative text-white px-6 py-3 rounded-lg font-medium text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                  style={{
                    backgroundColor: "#FFB30E",
                    boxShadow:
                      "0 0 20px rgba(255, 179, 14, 0.6), 0 0 40px rgba(255, 179, 14, 0.4), 0 0 60px rgba(255, 179, 14, 0.2)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 30px rgba(255, 179, 14, 0.8), 0 0 60px rgba(255, 179, 14, 0.6), 0 0 90px rgba(255, 179, 14, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 0 20px rgba(255, 179, 14, 0.6), 0 0 40px rgba(255, 179, 14, 0.4), 0 0 60px rgba(255, 179, 14, 0.2)";
                  }}
                >
                  <span className="relative z-10">Subscribe</span>

                  {/* Optional: Inner glow pulse */}
                  <div className="absolute inset-0 opacity-0 animate-pulse transition-opacity duration-300 hover:opacity-100">
                    <div className="absolute inset-0 bg-white opacity-20 rounded-lg"></div>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs">
            All rights Reserved © Your Company, 2023
          </p>
          <p className="text-gray-400 text-xs">Made with 💛 by Themewagon</p>
        </div>
      </div>
    </footer>
  );
}
