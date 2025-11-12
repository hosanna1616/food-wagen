"use client";

import React from "react";
import Image from "next/image";

interface NavbarProps {
  onAddMeal: () => void;
}

export function Navbar({ onAddMeal }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm ml-13">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-36 h-100 relative">
              <Image
                src="/logonew (1).svg"
                alt="FoodWagen Logo"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Add Meal Button */}
          <button
            onClick={onAddMeal}
            className="bg-orange mr-13 hover:bg-orange/90 text-white px-11 py-2 rounded-full font-medium transition-colors"
            data-test-id="food-add-meal-btn"
          >
            Add Meal
          </button>
        </div>
      </div>
    </nav>
  );
}
