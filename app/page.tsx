"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { FoodCard } from "@/components/food-card";
import { Footer } from "@/components/footer";
import { FoodModal } from "@/components/food-modal";
import { DeleteModal } from "@/components/delete-modal";
import { foodApi } from "@/lib/api";
import { Food } from "@/types/food";

export default function Home() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<Food | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingFood, setDeletingFood] = useState<Food | undefined>(undefined);

  // Fetch foods
  const {
    data: foods = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["foods", searchQuery],
    queryFn: () =>
      searchQuery ? foodApi.searchFoods(searchQuery) : foodApi.getAllFoods(),
    retry: 2,
    staleTime: 30000,
  });

  // Ensure foods is always an array
  const safefoods = Array.isArray(foods) ? foods : [];

  // Create mutation
  const createMutation = useMutation({
    mutationFn: foodApi.createFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      setIsModalOpen(false);
      setEditingFood(undefined);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Food> }) =>
      foodApi.updateFood(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
      setIsModalOpen(false);
      setEditingFood(undefined);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: foodApi.deleteFood,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["foods"] });
    },
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleOpenAddModal = () => {
    setEditingFood(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (food: Food) => {
    setEditingFood(food);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const food = safefoods.find((f) => f.id === id);
    if (food) {
      setDeletingFood(food);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (deletingFood) {
      deleteMutation.mutate(deletingFood.id, {
        onSuccess: () => {
          setIsDeleteModalOpen(false);
          setDeletingFood(undefined);
        },
      });
    }
  };

  const handleModalSubmit = (foodData: Omit<Food, "id">) => {
    if (editingFood) {
      updateMutation.mutate({
        id: editingFood.id,
        data: foodData,
      });
    } else {
      createMutation.mutate(foodData);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAddMeal={handleOpenAddModal} />
      <Hero onSearch={handleSearch} />

      {/* Featured Meals Section */}
      <main className="flex-1 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Featured Meals
          </h2>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading delicious meals...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-600">
                Failed to load meals. Please try again later.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && safefoods.length === 0 && (
            <div className="text-center py-12">
              <div className="empty-state-message">
                <p className="text-gray-600 text-lg mb-4">
                  No meals found. Try a different search.
                </p>
                <button
                  onClick={handleOpenAddModal}
                  className="bg-orange hover:bg-orange/90 text-white px-6 py-3 rounded-full font-semibold transition-colors"
                >
                  Add Your First Meal
                </button>
              </div>
            </div>
          )}

          {/* Food Grid */}
          {!isLoading && !error && safefoods.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {safefoods.map((food, index) => (
                  <FoodCard
                    key={food.id}
                    food={food}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    index={index}
                  />
                ))}
              </div>

              {/* See More Button */}
              <div className="flex justify-center mt-10">
                <button
                  className="px-6 py-3 rounded font-semibold text-white transition-all hover:opacity-90 flex items-center gap-2 text-sm"
                  style={{ backgroundColor: "#FFB30E" }}
                >
                  load more &gt;
                </button>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      {/* Food Modal */}
      <FoodModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingFood(undefined);
        }}
        onSubmit={handleModalSubmit}
        initialData={editingFood}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingFood(undefined);
        }}
        onConfirm={handleConfirmDelete}
        foodName={deletingFood?.name || ""}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
