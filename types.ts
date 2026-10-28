// Matches the records returned by GET /my-booking/:email and the
// payload BookingCard posts to POST /booking. Keep in sync with the backend.
export interface Booking {
  _id: string;
  userName: string;
  email: string;
  image?: string;
  destinationId: string;
  destinationName: string;
  imageUrl: string;
  price: number;
  departureDate: string;
  bookingDate: string;
  status: string; // "Confirmed" | "Pending"
}

export interface Destination {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}