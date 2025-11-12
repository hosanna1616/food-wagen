import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FoodCard } from "@/components/food-card";
import { Food } from "@/types/food";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("FoodCard Component", () => {
  const mockFood: Food = {
    id: "1",
    name: "Delicious Pizza",
    price: 12.99,
    rating: 4.5,
    image: "https://example.com/pizza.jpg",
    restaurant: "Pizza Palace",
    restaurantLogo: "https://example.com/logo.jpg",
    status: "Open Now",
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component Rendering
  describe("Component Rendering", () => {
    test("renders food card with correct food name", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      expect(screen.getByText("Delicious Pizza")).toBeInTheDocument();
    });

    test("renders food card with correct price", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      expect(screen.getByText("$12.99")).toBeInTheDocument();
    });

    test("renders food card with correct rating", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      expect(screen.getByText("4.5")).toBeInTheDocument();
    });

    test("renders restaurant name", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      expect(screen.getByText("Pizza Palace")).toBeInTheDocument();
    });

    test("renders restaurant status", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      expect(screen.getByText("Open")).toBeInTheDocument();
    });

    test("has correct CSS classes for styling", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const card = screen.getByTestId("food-card");
      expect(card).toHaveClass("food-card");
    });
  });

  // Test 2: User Interaction - Button Clicks
  describe("User Interaction - Button Clicks", () => {
    test("opens menu when menu button is clicked", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const menuButton = screen.getByTestId("food-menu-btn");
      fireEvent.click(menuButton);

      expect(screen.getByText("Edit Food")).toBeInTheDocument();
      expect(screen.getByText("Delete Food")).toBeInTheDocument();
    });

    test("calls onEdit when edit button is clicked", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const menuButton = screen.getByTestId("food-menu-btn");
      fireEvent.click(menuButton);

      const editButton = screen.getByTestId("food-edit-btn");
      fireEvent.click(editButton);

      expect(mockOnEdit).toHaveBeenCalledWith(mockFood);
      expect(mockOnEdit).toHaveBeenCalledTimes(1);
    });

    test("calls onDelete when delete button is clicked", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const menuButton = screen.getByTestId("food-menu-btn");
      fireEvent.click(menuButton);

      const deleteButton = screen.getByTestId("food-delete-btn");
      fireEvent.click(deleteButton);

      expect(mockOnDelete).toHaveBeenCalledWith("1");
      expect(mockOnDelete).toHaveBeenCalledTimes(1);
    });

    test("closes menu after edit button is clicked", () => {
      render(
        <FoodCard
          food={mockFood}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const menuButton = screen.getByTestId("food-menu-btn");
      fireEvent.click(menuButton);

      const editButton = screen.getByTestId("food-edit-btn");
      fireEvent.click(editButton);

      expect(screen.queryByText("Edit Food")).not.toBeInTheDocument();
    });
  });

  // Test 3: Handles Different Status Values
  describe("Status Display", () => {
    test('displays "Open" status with green styling', () => {
      render(
        <FoodCard
          food={{ ...mockFood, status: "Open Now" }}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const statusElement = screen.getByText("Open");
      expect(statusElement).toHaveClass("bg-green-100", "text-green-600");
    });

    test('displays "Closed" status with red styling', () => {
      render(
        <FoodCard
          food={{ ...mockFood, status: "Closed" }}
          onEdit={mockOnEdit}
          onDelete={mockOnDelete}
          index={0}
        />
      );

      const statusElement = screen.getByText("Closed");
      expect(statusElement).toHaveClass("bg-red-100", "text-red-600");
    });
  });
});
