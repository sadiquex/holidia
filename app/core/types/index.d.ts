interface Property {
  id: number;
  name: string;
  description: string;
  price_per_night: number;
  owner_id: string;
  created_at: string;
  images: string[];
  address: string;
  city: string;
  country: string;
  amenities: string;
  capacity: number;
  longitude: number;
  latitude: number;
  latitude_delta: number;
  longitude_delta: number;
  is_favourite: boolean;
  rating?: number;
}

interface User {
  id: string;
  name: string;
  created_at: string;
  email: string;
  username: string;
  password: string;
  properties: Property[] | null;
  avatar: string;
}

interface Booking {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  property_id: string;
  user_id: string;
  check_in: string;
  check_out: string;
  total_price: number;
  status: 'pending_payment' | 'succeeded' | 'failed';
  guest_count: number;
  special_requests: string;
  property: Property;
  user: User;
  payment_intent_id: string;
  payment_status: 'pending' | 'succeeded';
}

interface ICartItem {
  id: string;
  name: string;
  price_per_night: number;
  quantity: number;
  product: string;
  startDate: string | Date;
  endDate: string | Date;
  days: number;
  image: string;
  property?: Property;
}
