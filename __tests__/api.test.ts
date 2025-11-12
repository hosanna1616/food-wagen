import axios from "axios";
import { foodApi } from "@/lib/api";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("foodApi GET and normalization", () => {
  test("normalizes foods with nested restaurant and missing fields", async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          id: "1",
          name: "Pasta",
          price: "10.5",
          rating: "4.2",
          image: "https://example.com/pasta.jpg",
          restaurant: {
            name: "Italian House",
            logo: "https://example.com/logo.png",
            status: "Open",
          },
        },
        {
          id: "2",
          name: "Sushi",
          price: 18,
          rating: 5,
          image: "https://example.com/sushi.jpg",
          restaurant: null, // missing restaurant details
          status: "Closed",
        },
      ],
    });

    const foods = await foodApi.getAllFoods();

    expect(foods).toHaveLength(2);
    expect(foods[0]).toMatchObject({
      id: "1",
      name: "Pasta",
      price: 10.5,
      rating: 4.2,
      restaurant: "Italian House",
      restaurantLogo: "https://example.com/logo.png",
      status: "Open",
    });
    expect(foods[1]).toMatchObject({
      id: "2",
      name: "Sushi",
      price: 18,
      rating: 5,
      restaurant: "Unknown Restaurant",
      restaurantLogo: "",
      status: "Closed",
    });
  });

  test("handles API error gracefully in searchFoods", async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
    await expect(foodApi.searchFoods("pizza")).rejects.toThrow("Network error");
  });
});
