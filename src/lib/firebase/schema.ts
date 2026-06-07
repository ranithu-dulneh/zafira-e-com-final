export type CategoryEnum = "mens" | "womens" | "unisex";

export interface Product {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  images: string[];
  primaryCategory: CategoryEnum;
  subCategory: string;
  stockCount: number;
  createdAt: number; // Timestamp
  ratingsAverage: number;
}

export interface Category {
  id: string;
  name: string;
  parentCategory: CategoryEnum;
}

export type DeliveryMethod = "COD" | "BankDeposit";
export type PaymentStatus = "Pending Verification" | "Paid";
export type OrderStatus = "Pending" | "Dispatched" | "Delivered";

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  deliveryMethod: DeliveryMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  shippingAddress: {
    fullName: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  bankReceiptUrl: string | null;
  createdAt: number; // Timestamp
}

export interface Offer {
  id: string;
  offerType: "free_delivery";
  thresholdAmount: number;
  isActive: boolean;
  description: string;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  comment: string;
  isApproved: boolean;
  createdAt: number; // Timestamp
}
