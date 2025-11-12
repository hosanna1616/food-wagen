"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import { DeliveryType } from "@/types/food";

interface HeroProps {
  onSearch: (query: string) => void;
}

export function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveryType, setDeliveryType] = useState<DeliveryType>("Delivery");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div
      style={{ backgroundColor: "#FFB30E" }}
      className="relative overflow-hidden "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 ml-23">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-5xl lg:text-6xl font-bold mb-2">
              Are you starving?
            </h1>
            <p className="text-base mb-6 opacity-90">
              Within a few clicks, find meals that are accessible near you
            </p>

            {/* Search Card */}
            <div className="bg-white rounded-xl p-5 shadow-xl">
              <div className="flex gap-3 mb-4">
                <button
                  onClick={() => setDeliveryType("Delivery")}
                  className={`flex items-center gap-2 px-2 py-1 rounded font-medium transition-all ${
                    deliveryType === "Delivery"
                      ? "text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                  style={{
                    backgroundColor:
                      deliveryType === "Delivery" ? "#FEF1E9" : "transparent",
                  }}
                >
                  <Image
                    src="/delivery.jpg"
                    alt="Delivery"
                    width={100}
                    height={40}
                    className="object-contain"
                    unoptimized
                  />
                </button>

                <button
                  onClick={() => setDeliveryType("Pickup")}
                  className={`flex items-center gap-2 px-2 py-1 rounded font-medium transition-all ${
                    deliveryType === "Pickup"
                      ? "text-white"
                      : "hover:bg-gray-100 text-gray-600"
                  }`}
                  style={{
                    backgroundColor:
                      deliveryType === "Pickup" ? "#FFB30E" : "transparent",
                  }}
                >
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="shrink-0"
                  >
                    <rect
                      x="16"
                      y="20"
                      width="32"
                      height="36"
                      rx="4"
                      fill="#888"
                    />
                    <path
                      d="M24 20a8 8 0 0116 0"
                      stroke="#fff"
                      strokeWidth="2"
                      fill="none"
                    />
                    <circle cx="24" cy="28" r="2" fill="#fff" />
                    <circle cx="40" cy="28" r="2" fill="#fff" />
                  </svg>
                  <span className="text-sm font-semibold">Pickup</span>
                </button>
              </div>

              {/* Search Input */}
              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded px-4 py-3">
                  <Search className="w-4 h-4 text-gray-400" />
                  <label htmlFor="food-search" className="sr-only">
                    Food search
                  </label>
                  <input
                    id="food-search"
                    type="text"
                    placeholder="what do you like to eat today?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="food-input flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-400 text-sm"
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 rounded font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2 text-sm"
                  style={{ backgroundColor: "#F9652B" }}
                >
                  Find meal
                </button>
              </div>
            </div>
          </div>

          {/* Right Image - No container, perfect size & position */}
          <div className="hidden lg:flex items-center ">
            <Image
              src="/spigeti.jpg"
              alt="Featured Food"
              width={384}
              height={384}
              className="pt-2 w-96 h-96 rounded-full object-cover"
              priority
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
