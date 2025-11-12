export interface Food {
  id: string;
  name: string;
  price: number | string;
  image: string;
  rating: number | string;
  restaurant: string;
  restaurantLogo: string;
  status: "Open" | "Closed" | "Open Now";
  description?: string;
  category?: string;
}

export interface SearchParams {
  name?: string;
}

export type DeliveryType = "Delivery" | "Pickup";
