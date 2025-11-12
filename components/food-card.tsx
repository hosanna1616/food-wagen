"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { MoreVertical, Star, Edit, Trash2 } from "lucide-react";
import { Food } from "@/types/food";

interface FoodCardProps {
  food: Food;
  onEdit: (food: Food) => void;
  onDelete: (id: string) => void;
  index: number;
}

// Helper function to validate URL
const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== "string" || url.trim() === "") return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export function FoodCard({ food, onEdit, onDelete, index }: FoodCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  // Ensure price and rating are numbers
  const price =
    typeof food.price === "number"
      ? food.price
      : parseFloat(String(food.price)) || 0;
  const rating =
    typeof food.rating === "number"
      ? food.rating
      : parseFloat(String(food.rating)) || 0;

  return (
    <div
      className="food-card bg-white rounded-2xl shadow-sm overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:shadow-lg animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
      data-testid="food-card"
    >
      {/* Image Container */}
      <div className="relative h-48 bg-gray-100">
        {!imageError && isValidUrl(food.image) ? (
          <Image
            src={food.image}
            alt={food.name}
            fill
            className="food-image object-cover"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="flex items-center justify-center h-full text-6xl">
            🍽️
          </div>
        )}

        {/* Price Badge - Top Left */}
        <div
          className="absolute top-3 left-2 flex items-center gap-1 px-4 py-2 rounded-full shadow-md"
          style={{ backgroundColor: "#F9652B" }}
        >
          {/* Price Tag Icon (SVG) */}
          <svg
            className="w-4 h-4 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M17.5 3h-11C5.67 3 5 3.67 5 4.5v15c0 .83.67 1.5 1.5 1.5h11c.83 0 1.5-.67 1.5-1.5v-15c0-.83-.67-1.5-1.5-1.5z" />
            <circle cx="9" cy="9" r="1.5" fill="currentColor" />
            <path d="M7 15h8" stroke="currentColor" strokeLinecap="round" />
          </svg>

          {/* Price Text */}
          <span className="food-price text-white font-bold text-sm tracking-wide">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Restaurant Logo and Menu */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div
              className="restaurant-logo w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0"
              style={{ backgroundColor: "#2962FF" }}
            >
              {isValidUrl(food.restaurantLogo) ? (
                <Image
                  src={food.restaurantLogo}
                  alt={food.restaurant}
                  fill
                  className="object-cover"
                  unoptimized
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full text-white font-bold text-lg">
                  {food.restaurant.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Three Dots Menu */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              data-testid="food-menu-btn"
              data-test-id="food-menu-btn"
            >
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>

            {showMenu && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <button
                  onClick={() => {
                    onEdit(food);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                  data-testid="food-edit-btn"
                  data-test-id="food-edit-btn"
                >
                  <Edit className="w-4 h-4" />
                  Edit Food
                </button>
                <button
                  onClick={() => {
                    onDelete(food.id);
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2 text-red-600"
                  data-testid="food-delete-btn"
                  data-test-id="food-delete-btn"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Food
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="food-name text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {food.name}
        </h3>

        {/* Restaurant Name */}
        <p className="restaurant-name text-xs text-gray-500 mb-2">
          {food.restaurant}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          <span className="food-rating text-yellow-500 font-semibold text-lg">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Status */}
        <div className="mb-3">
          <span
            className={`restaurant-status inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              food.status === "Open" || food.status === "Open Now"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {food.status === "Open"
              ? "Open"
              : food.status === "Open Now"
              ? "Open"
              : "Closed"}
          </span>
        </div>
      </div>
    </div>
  );
}
