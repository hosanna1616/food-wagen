import axios from "axios";
import { Food } from "@/types/food";

const API_BASE_URL = "https://6852821e0594059b23cdd834.mockapi.io";

// Normalize food data from API
const normalizeFood = (data: Record<string, unknown>): Food => {
  // Handle nested restaurant object
  const restaurant =
    typeof data.restaurant === "object" && data.restaurant !== null
      ? (data.restaurant as Record<string, unknown>)
      : null;

  return {
    id: (data.id as string) || String(Math.random()),
    name: (data.name as string) || "Unnamed Meal",
    price:
      typeof data.price === "number"
        ? data.price
        : parseFloat(String(data.price)) || 0,
    image: (data.image as string) || "",
    rating:
      typeof data.rating === "number"
        ? data.rating
        : parseFloat(String(data.rating)) || 0,
    restaurant: restaurant
      ? (restaurant.name as string) || "Unknown Restaurant"
      : (data.restaurant as string) || "Unknown Restaurant",
    restaurantLogo: restaurant
      ? (restaurant.logo as string) || ""
      : (data.restaurantLogo as string) || "",
    status:
      (restaurant && restaurant.status === "Closed") || data.status === "Closed"
        ? "Closed"
        : "Open",
    description: data.description as string | undefined,
    category: data.category as string | undefined,
  };
};

export const foodApi = {
  // Get all foods
  getAllFoods: async (): Promise<Food[]> => {
    const response = await axios.get(`${API_BASE_URL}/Food`);
    return response.data.map(normalizeFood);
  },

  // Search foods by name
  searchFoods: async (query: string): Promise<Food[]> => {
    const response = await axios.get(`${API_BASE_URL}/Food`, {
      params: { name: query },
    });
    return response.data.map(normalizeFood);
  },

  // Create a new food
  createFood: async (food: Omit<Food, "id">): Promise<Food> => {
    // Format data to match API expected structure
    const payload = {
      name: food.name,
      price: food.price,
      rating: food.rating,
      image: food.image,
      restaurant: {
        name: food.restaurant,
        logo: food.restaurantLogo,
        status: food.status === "Open Now" ? "Open" : food.status,
      },
    };
    const response = await axios.post(`${API_BASE_URL}/Food`, payload);
    return normalizeFood(response.data);
  },

  // Update a food
  updateFood: async (id: string, food: Partial<Food>): Promise<Food> => {
    // Format data to match API expected structure
    const payload: Record<string, unknown> = {};
    if (food.name) payload.name = food.name;
    if (food.price !== undefined) payload.price = food.price;
    if (food.rating !== undefined) payload.rating = food.rating;
    if (food.image) payload.image = food.image;
    if (food.restaurant || food.restaurantLogo || food.status) {
      payload.restaurant = {
        name: food.restaurant,
        logo: food.restaurantLogo,
        status: food.status === "Open Now" ? "Open" : food.status,
      };
    }
    const response = await axios.put(`${API_BASE_URL}/Food/${id}`, payload);
    return normalizeFood(response.data);
  },

  // Delete a food
  deleteFood: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/Food/${id}`);
  },
};
