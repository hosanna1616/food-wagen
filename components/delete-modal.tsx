"use client";

import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  foodName: string;
  isLoading?: boolean;
}

export function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  foodName,
  isLoading,
}: DeleteModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isLoading) {
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
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl py-16 px-12">
        {/* Orange Title */}
        <h2
          className="text-5xl font-bold text-center mb-8"
          style={{ color: "#FFB30E" }}
        >
          Delete Meal
        </h2>

        {/* Gray Message */}
        <p className="text-center text-gray-400 text-xl mb-12">
          Are you sure you want to delete this meal? Actions cannot be reversed.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-6 max-w-3xl mx-auto">
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 px-6 py-4 rounded-2xl text-white font-bold text-lg hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            style={{ backgroundColor: "#FFB30E" }}
            disabled={isLoading}
            data-test-id="food-delete-confirm-btn"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </span>
            ) : (
              "Yes"
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-2xl bg-white border-2 text-gray-900 font-bold text-lg hover:bg-gray-50 transition-colors"
            style={{ borderColor: "#FFB30E" }}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
