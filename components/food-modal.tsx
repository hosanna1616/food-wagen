"use client";

import React, { useState, useEffect } from "react";
import { Food } from "@/types/food";

interface FoodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (food: Omit<Food, "id">) => void;
  initialData?: Food;
  isLoading?: boolean;
}

interface FormErrors {
  food_name?: string;
  food_rating?: string;
  food_image?: string;
  restaurant_name?: string;
  restaurant_logo?: string;
  restaurant_status?: string;
}

export function FoodModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: FoodModalProps) {
  const getInitialFormData = () => {
    if (initialData) {
      return {
        food_name: initialData.name,
        food_rating: String(initialData.rating),
        food_price: String(initialData.price),
        food_image: initialData.image,
        restaurant_name: initialData.restaurant,
        restaurant_logo: initialData.restaurantLogo,
        restaurant_status:
          initialData.status === "Closed"
            ? ("Closed" as const)
            : ("Open Now" as const),
      };
    }
    return {
      food_name: "",
      food_rating: "",
      food_price: "",
      food_image: "",
      restaurant_name: "",
      restaurant_logo: "",
      restaurant_status: "Open Now" as const,
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialData?.id]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food name is required";
    }

    const rating = parseFloat(formData.food_rating);
    if (!formData.food_rating || isNaN(rating)) {
      newErrors.food_rating = "Food Rating must be a number";
    } else if (rating < 1 || rating > 5) {
      newErrors.food_rating = "Food Rating must be between 1 and 5";
    }

    if (!formData.food_image.trim()) {
      newErrors.food_image = "Food Image URL is required";
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant Name is required";
    }

    if (!formData.restaurant_logo.trim()) {
      newErrors.restaurant_logo = "Restaurant Logo URL is required";
    }

    if (
      formData.restaurant_status !== "Open Now" &&
      formData.restaurant_status !== "Closed"
    ) {
      newErrors.restaurant_status =
        "Restaurant Status must be 'Open Now' or 'Closed'";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const foodData: Omit<Food, "id"> = {
      name: formData.food_name,
      price: parseFloat(formData.food_price) || 0,
      rating: parseFloat(formData.food_rating),
      image: formData.food_image,
      restaurant: formData.restaurant_name,
      restaurantLogo: formData.restaurant_logo,
      status: formData.restaurant_status,
    };

    onSubmit(foodData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      style={{
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.3)",
      }}
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
        {/* Header with orange title */}
        <div className="pt-8 pb-4 px-6">
          <h2
            className="text-3xl font-bold text-center"
            style={{ color: "#FFB30E" }}
          >
            {initialData ? "Edit Meal" : "Add a meal"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 pb-6 space-y-3">
          {/* Food Name */}
          <div>
            <label
              htmlFor="food_name"
              className={`block text-sm text-gray-400 mb-2 ${
                initialData ? "" : "sr-only"
              }`}
            >
              Food name
            </label>
            <input
              type="text"
              id="food_name"
              name="food_name"
              value={formData.food_name}
              onChange={handleChange}
              placeholder={initialData ? "" : "Food name"}
              className="food-input w-full px-4 py-2.5 rounded-xl bg-gray-50 border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
              disabled={isLoading}
              aria-describedby={
                errors.food_name ? "food-name-error" : undefined
              }
            />
            {errors.food_name && (
              <p
                id="food-name-error"
                className="mt-2 text-sm"
                style={{ color: "#EF4444" }}
              >
                {errors.food_name}
              </p>
            )}
          </div>

          {/* Food Rating */}
          <div>
            <label
              htmlFor="food_rating"
              className={`block text-sm text-gray-400 mb-2 ${
                initialData ? "" : "sr-only"
              }`}
            >
              Food rating
            </label>
            <input
              type="number"
              id="food_rating"
              name="food_rating"
              value={formData.food_rating}
              onChange={handleChange}
              placeholder={initialData ? "" : "Food rating"}
              step="0.1"
              className="food-input w-full px-4 py-2.5 rounded-xl bg-gray-50 border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
              disabled={isLoading}
              aria-describedby={
                errors.food_rating ? "food-rating-error" : undefined
              }
            />
            {errors.food_rating && (
              <p
                id="food-rating-error"
                className="mt-2 text-sm"
                style={{ color: "#EF4444" }}
              >
                {errors.food_rating}
              </p>
            )}
          </div>

          {/* Food Image */}
          <div>
            <label
              htmlFor="food_image"
              className={`block text-sm text-gray-400 mb-2 ${
                initialData ? "" : "sr-only"
              }`}
            >
              Food image (link)
            </label>
            <input
              type="url"
              id="food_image"
              name="food_image"
              value={formData.food_image}
              onChange={handleChange}
              placeholder={initialData ? "" : "Food image (link)"}
              className="food-input w-full px-4 py-2.5 rounded-xl bg-gray-50 border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
              disabled={isLoading}
              aria-describedby={
                errors.food_image ? "food-image-error" : undefined
              }
            />
            {errors.food_image && (
              <p
                id="food-image-error"
                className="mt-2 text-sm"
                style={{ color: "#EF4444" }}
              >
                {errors.food_image}
              </p>
            )}
          </div>

          {/* Restaurant Name */}
          <div>
            <label
              htmlFor="restaurant_name"
              className={`block text-sm text-gray-400 mb-2 ${
                initialData ? "" : "sr-only"
              }`}
            >
              Restaurant name
            </label>
            <input
              type="text"
              id="restaurant_name"
              name="restaurant_name"
              value={formData.restaurant_name}
              onChange={handleChange}
              placeholder={initialData ? "" : "Restaurant name"}
              className="food-input w-full px-4 py-2.5 rounded-xl bg-gray-50 border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
              disabled={isLoading}
              aria-describedby={
                errors.restaurant_name ? "restaurant-name-error" : undefined
              }
            />
            {errors.restaurant_name && (
              <p
                id="restaurant-name-error"
                className="mt-2 text-sm"
                style={{ color: "#EF4444" }}
              >
                {errors.restaurant_name}
              </p>
            )}
          </div>

          {/* Restaurant Logo */}
          <div>
            <label
              htmlFor="restaurant_logo"
              className={`block text-sm text-gray-400 mb-2 ${
                initialData ? "" : "sr-only"
              }`}
            >
              Restaurant logo (link)
            </label>
            <input
              type="url"
              id="restaurant_logo"
              name="restaurant_logo"
              value={formData.restaurant_logo}
              onChange={handleChange}
              placeholder={initialData ? "" : "Restaurant logo (link)"}
              className="food-input w-full px-4 py-2.5 rounded-xl bg-gray-50 border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
              disabled={isLoading}
              aria-describedby={
                errors.restaurant_logo ? "restaurant-logo-error" : undefined
              }
            />
            {errors.restaurant_logo && (
              <p
                id="restaurant-logo-error"
                className="mt-2 text-sm"
                style={{ color: "#EF4444" }}
              >
                {errors.restaurant_logo}
              </p>
            )}
          </div>

          {/* Restaurant Status */}
          <div>
            <label
              htmlFor="restaurant_status"
              className={`block text-sm text-gray-400 mb-2 ${
                initialData ? "" : "sr-only"
              }`}
            >
              Restaurant status (open/close)
            </label>
            <select
              id="restaurant_status"
              name="restaurant_status"
              value={formData.restaurant_status}
              onChange={handleChange}
              className="food-input w-full px-4 py-2.5 rounded-xl bg-white border border-gray-300 outline-none text-gray-400 appearance-none text-sm"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%23999999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 1.25rem center",
              }}
              disabled={isLoading}
              aria-describedby={
                errors.restaurant_status ? "restaurant-status-error" : undefined
              }
            >
              <option value="" disabled>
                Restaurant status (open/close)
              </option>
              <option value="Open Now">Open Now</option>
              <option value="Closed">Closed</option>
            </select>
            {errors.restaurant_status && (
              <p
                id="restaurant-status-error"
                className="mt-2 text-sm"
                style={{ color: "#EF4444" }}
              >
                {errors.restaurant_status}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-2.5 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              disabled={isLoading}
              style={{ backgroundColor: "#FFB30E" }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  {initialData ? "Updating..." : "Adding..."}
                </span>
              ) : initialData ? (
                "Save"
              ) : (
                "Add"
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-2.5 rounded-xl bg-white border-2 text-gray-900 font-bold text-sm hover:bg-gray-50 transition-colors"
              style={{ borderColor: "#FFB30E" }}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
