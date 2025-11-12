import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FoodModal } from "@/components/food-modal";
import { Food } from "@/types/food";

describe("FoodModal Component", () => {
  const mockOnClose = jest.fn();
  const mockOnSubmit = jest.fn();

  const mockFood: Food = {
    id: "1",
    name: "Test Food",
    price: 15.99,
    rating: 4.0,
    image: "https://example.com/food.jpg",
    restaurant: "Test Restaurant",
    restaurantLogo: "https://example.com/logo.jpg",
    status: "Open Now",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Component Rendering
  describe("Component Rendering", () => {
    test("renders modal when isOpen is true", () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByText("Add a meal")).toBeTruthy();
    });

    test("does not render modal when isOpen is false", () => {
      render(
        <FoodModal
          isOpen={false}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.queryByText("Add a meal")).toBeNull();
    });

    test("renders all required input fields", () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      expect(screen.getByPlaceholderText("Food name")).toBeTruthy();
      expect(screen.getByPlaceholderText("Food rating")).toBeTruthy();
      expect(screen.getByPlaceholderText("Food image (link)")).toBeTruthy();
      expect(screen.getByPlaceholderText("Restaurant name")).toBeTruthy();
      expect(
        screen.getByPlaceholderText("Restaurant logo (link)")
      ).toBeTruthy();
      expect(screen.getByDisplayValue("Open Now")).toBeTruthy();
    });

    test('shows "Edit Food" title when editing', () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
          initialData={mockFood}
        />
      );

      expect(screen.getByText("Edit Meal")).toBeTruthy();
    });
  });

  // Test 2: Form Input and Submission
  describe("Form Input and Submission", () => {
    test("allows user to type in food name input", async () => {
      const user = userEvent.setup();

      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const nameInput = screen.getByPlaceholderText(
        "Food name"
      ) as HTMLInputElement;
      await user.type(nameInput, "Burger");

      expect(nameInput.value).toBe("Burger");
    });

    test("allows user to type in rating input", async () => {
      const user = userEvent.setup();

      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const ratingInput = screen.getByPlaceholderText(
        "Food rating"
      ) as HTMLInputElement;
      await user.type(ratingInput, "4.5");

      expect(ratingInput.value).toBe("4.5");
    });

    test("submits form with valid data", async () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      fireEvent.change(screen.getByPlaceholderText("Food name"), {
        target: { value: "Burger" },
      });
      fireEvent.change(screen.getByPlaceholderText("Food rating"), {
        target: { value: "4.5" },
      });
      // Note: food_price field removed from this test as it's not required
      fireEvent.change(screen.getByPlaceholderText("Food image (link)"), {
        target: { value: "https://example.com/burger.jpg" },
      });
      fireEvent.change(screen.getByPlaceholderText("Restaurant name"), {
        target: { value: "Burger King" },
      });
      fireEvent.change(screen.getByPlaceholderText("Restaurant logo (link)"), {
        target: { value: "https://example.com/logo.jpg" },
      });

      const submitButton = screen.getByRole("button", { name: /add/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
      });
    });

    test("shows validation errors for empty required fields", async () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const submitButton = screen.getByRole("button", { name: /add/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Food name is required")).toBeTruthy();
        expect(screen.getByText("Food Rating must be a number")).toBeTruthy();
        expect(screen.getByText("Food Image URL is required")).toBeTruthy();
      });

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  // Test 3: Validation
  describe("Form Validation", () => {
    test("validates rating is a number", async () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      const ratingInput = screen.getByPlaceholderText("Food rating");
      fireEvent.change(ratingInput, { target: { value: "abc" } });

      const submitButton = screen.getByRole("button", { name: /add/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Food Rating must be a number")).toBeTruthy();
      });
    });

    test("validates rating is between 1 and 5", async () => {
      render(
        <FoodModal
          isOpen={true}
          onClose={mockOnClose}
          onSubmit={mockOnSubmit}
        />
      );

      // Fill in all required fields
      fireEvent.change(screen.getByPlaceholderText("Food name"), {
        target: { value: "Test" },
      });
      fireEvent.change(screen.getByPlaceholderText("Food rating"), {
        target: { value: "6" },
      });
      fireEvent.change(screen.getByPlaceholderText("Food image (link)"), {
        target: { value: "https://example.com/test.jpg" },
      });
      fireEvent.change(screen.getByPlaceholderText("Restaurant name"), {
        target: { value: "Test" },
      });
      fireEvent.change(screen.getByPlaceholderText("Restaurant logo (link)"), {
        target: { value: "https://example.com/logo.jpg" },
      });

      const submitButton = screen.getByRole("button", { name: /add/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText("Food Rating must be between 1 and 5")
        ).toBeTruthy();
      });
    });
  });
});
