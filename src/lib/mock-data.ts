/**
 * Comprehensive Mock Data
 *
 * This file contains all mock data for the application.
 * All API calls are replaced with this mock data.
 *
 * Mock data is sourced from the Bootstrap version (public/sellerhub-bootstrap/js/app.js).
 */

import type { Product } from "@/types/product.types";
import type { Order, OrdersMetrics, OrderItem } from "@/types/order.types";
import type { NotificationItem } from "@/types/notification.types";
import type { VendorProfile } from "@/types/dashboard.types";
import type { Category } from "@/types/category.types";
import type { BusinessCategory } from "@/types/business-category.types";

// Simulate network latency
export const delay = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// Image URLs (from Bootstrap version)
// ---------------------------------------------------------------------------
export const IMAGES = {
  phones: [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
  ],
  accessories: [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608156639585-b3a7a6e98d0a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=400&fit=crop",
  ],
  fashion: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  ],
  home: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  ],
  beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
  ],
  avatars: [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop",
  ],
  logos: [
    "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1541562232579-512a21360f5a?w=200&h=200&fit=crop",
  ],
  hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  placeholder: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=400&fit=crop",
};

// ---------------------------------------------------------------------------
// Vendor / Auth (Bootstrap: getUser() + CONFIG)
// ---------------------------------------------------------------------------
export const MOCK_TOKEN = "mock-jwt-token-seller-2024";
export const MOCK_VENDOR_ID = "vendor-001";

export let mockVendorProfile: VendorProfile = {
  vendorId: MOCK_VENDOR_ID,
  account: {
    emailAddress: "seller@sellerhub.com",
    fullName: "Demo Seller",
    phoneNumber: "+234 801 234 5678",
    profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
  },
  accountInfo: {
    accountName: "Demo Seller",
    accountNumber: "0123456789",
    bank: "First Bank of Nigeria",
  },
  business: {
    businessName: "SellerHub",
    businessCategory: "Electronics & Technology",
    businessRegNumber: "RC-123456",
    storeName: "SellerHub",
    businessAddress: "12 Broad Street, Lagos Island, Lagos, Nigeria",
    taxIdNumber: "TIN-987654321",
    idDocument: "",
    businessRegCertificate: "",
  },
  storefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
  createdAt: "2024-01-10T08:00:00.000Z",
  updatedAt: "2024-06-15T12:30:00.000Z",
};

export let mockLogoUrl: string | null = "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=200&h=200&fit=crop";

// ---------------------------------------------------------------------------
// Products (exact data from Bootstrap MOCK_PRODUCTS)
// ---------------------------------------------------------------------------
export let mockProducts: Product[] = [
  {
    productId: "prod-001",
    productName: "Wireless Bluetooth Headphones",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
    productTags: ["headphones", "wireless", "bluetooth", "audio"],
    unitPrice: "45000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "45000",
    stock: "150",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-03-01T09:00:00.000Z",
    updatedAt: "2024-06-10T11:00:00.000Z",
  },
  {
    productId: "prod-002",
    productName: "Smart Watch Pro",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "Advanced fitness tracking with heart rate monitor and GPS.",
    productTags: ["smartwatch", "fitness", "electronics", "wearable"],
    unitPrice: "89000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "89000",
    stock: "75",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-03-15T10:00:00.000Z",
    updatedAt: "2024-06-11T14:00:00.000Z",
  },
  {
    productId: "prod-003",
    productName: "Leather Crossbody Bag",
    categoryId: "cat-fashion",
    categoryName: "Fashion",
    productDescription: "Handcrafted genuine leather bag perfect for everyday use.",
    productTags: ["bag", "leather", "fashion", "crossbody"],
    unitPrice: "35000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "35000",
    stock: "45",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-04-01T08:30:00.000Z",
    updatedAt: "2024-06-12T09:00:00.000Z",
  },
  {
    productId: "prod-004",
    productName: "Organic Green Tea Set",
    categoryId: "cat-food",
    categoryName: "Food & Beverages",
    productDescription: "Premium organic green tea collection with 6 varieties.",
    productTags: ["tea", "organic", "food", "beverages"],
    unitPrice: "12500",
    discountType: "none",
    discountValue: "0",
    discountPrice: "12500",
    stock: "200",
    minStock: "20",
    images: ["https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-04-20T12:00:00.000Z",
    updatedAt: "2024-06-13T10:00:00.000Z",
  },
  {
    productId: "prod-005",
    productName: "Minimalist Desk Lamp",
    categoryId: "cat-home",
    categoryName: "Home & Living",
    productDescription: "Modern LED desk lamp with adjustable brightness and color temperature.",
    productTags: ["lamp", "desk", "home", "lighting"],
    unitPrice: "22000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "22000",
    stock: "89",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-01T09:00:00.000Z",
    updatedAt: "2024-06-14T15:00:00.000Z",
  },
  {
    productId: "prod-006",
    productName: "Cotton T-Shirt Pack",
    categoryId: "cat-fashion",
    categoryName: "Fashion",
    productDescription: "Premium cotton t-shirts in 5 different colors.",
    productTags: ["tshirt", "cotton", "fashion", "clothing"],
    unitPrice: "18500",
    discountType: "none",
    discountValue: "0",
    discountPrice: "18500",
    stock: "300",
    minStock: "20",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-10T14:00:00.000Z",
    updatedAt: "2024-06-15T10:00:00.000Z",
  },
  {
    productId: "prod-007",
    productName: "Portable Power Bank",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "20000mAh power bank with fast charging support.",
    productTags: ["powerbank", "charger", "electronics", "portable"],
    unitPrice: "15500",
    discountType: "none",
    discountValue: "0",
    discountPrice: "15500",
    stock: "120",
    minStock: "15",
    images: ["https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-15T11:00:00.000Z",
    updatedAt: "2024-06-16T09:00:00.000Z",
  },
  {
    productId: "prod-008",
    productName: "Yoga Mat Premium",
    categoryId: "cat-sports",
    categoryName: "Sports & Fitness",
    productDescription: "Extra thick yoga mat with carrying strap.",
    productTags: ["yoga", "mat", "fitness", "sports"],
    unitPrice: "9500",
    discountType: "none",
    discountValue: "0",
    discountPrice: "9500",
    stock: "85",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-20T08:00:00.000Z",
    updatedAt: "2024-06-17T12:00:00.000Z",
  },
  {
    productId: "prod-009",
    productName: "Ceramic Coffee Mug Set",
    categoryId: "cat-home",
    categoryName: "Home & Living",
    productDescription: "Set of 6 hand-painted ceramic mugs.",
    productTags: ["mug", "ceramic", "home", "kitchen"],
    unitPrice: "14000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "14000",
    stock: "65",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-25T10:00:00.000Z",
    updatedAt: "2024-06-18T14:00:00.000Z",
  },
  {
    productId: "prod-010",
    productName: "Natural Skincare Set",
    categoryId: "cat-beauty",
    categoryName: "Beauty",
    productDescription: "Organic skincare routine with cleanser, toner, and moisturizer.",
    productTags: ["skincare", "organic", "beauty", "natural"],
    unitPrice: "28500",
    discountType: "none",
    discountValue: "0",
    discountPrice: "28500",
    stock: "95",
    minStock: "10",
    images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop"],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-06-01T09:00:00.000Z",
    updatedAt: "2024-06-19T11:00:00.000Z",
  },
];

// ---------------------------------------------------------------------------
// Orders (exact data from Bootstrap MOCK_ORDERS)
// ---------------------------------------------------------------------------
export const mockOrders: Order[] = [
  {
    orderNo: "ORD-2024-0008",
    totalAmount: 29750,
    status: "processing",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Emeka Okafor",
    customerEmail: "emeka@email.com",
    customerPhone: "+234 802 345 6789",
    shippingAddress: "15 Adeniran Ogunsanya, Surulere, Lagos",
    orderEarning: 27000,
    createdAt: "2024-06-17T09:30:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0007",
    totalAmount: 380000,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Amina Yusuf",
    customerEmail: "amina@email.com",
    customerPhone: "+234 803 456 7890",
    shippingAddress: "42 Ahmadu Bello Way, Victoria Island, Lagos",
    orderEarning: 355000,
    createdAt: "2024-06-16T13:45:00.000Z",
    totalItemsCount: 3,
  },
  {
    orderNo: "ORD-2024-0006",
    totalAmount: 1450000,
    status: "pending",
    paymentMethod: "transfer",
    paymentStatus: "pending",
    customerName: "Chidi Nnamdi",
    customerEmail: "chidi@email.com",
    customerPhone: "+234 804 567 8901",
    shippingAddress: "8 Hospital Road, GRA, Port Harcourt",
    orderEarning: 1375000,
    createdAt: "2024-06-15T10:15:00.000Z",
    totalItemsCount: 7,
  },
  {
    orderNo: "ORD-2024-0005",
    totalAmount: 99250,
    status: "shipped",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Funke Adeyemi",
    customerEmail: "funke@email.com",
    customerPhone: "+234 805 678 9012",
    shippingAddress: "23 Marina Road, Calabar",
    orderEarning: 92000,
    createdAt: "2024-06-14T08:30:00.000Z",
    totalItemsCount: 5,
  },
  {
    orderNo: "ORD-2024-0004",
    totalAmount: 55000,
    status: "cancelled",
    paymentMethod: "wallet",
    paymentStatus: "refunded",
    customerName: "Ibrahim Musa",
    customerEmail: "ibrahim@email.com",
    customerPhone: "+234 806 789 0123",
    shippingAddress: "5 Kano Road, Kaduna",
    orderEarning: 0,
    createdAt: "2024-06-11T16:00:00.000Z",
    totalItemsCount: 2,
  },
  {
    orderNo: "ORD-2024-0003",
    totalAmount: 28500,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Ngozi Eze",
    customerEmail: "ngozi@email.com",
    customerPhone: "+234 807 890 1234",
    shippingAddress: "12 Ogui Road, Enugu",
    orderEarning: 26000,
    createdAt: "2024-06-10T11:45:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0002",
    totalAmount: 66000,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Tunde Bakare",
    customerEmail: "tunde@email.com",
    customerPhone: "+234 808 901 2345",
    shippingAddress: "78 Allen Avenue, Ikeja, Lagos",
    orderEarning: 60000,
    createdAt: "2024-06-08T09:30:00.000Z",
    totalItemsCount: 3,
  },
  {
    orderNo: "ORD-2024-0001",
    totalAmount: 104500,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Aisha Mohammed",
    customerEmail: "aisha@email.com",
    customerPhone: "+234 809 012 3456",
    shippingAddress: "33 Wuse 2, Abuja",
    orderEarning: 96000,
    createdAt: "2024-06-05T14:22:00.000Z",
    totalItemsCount: 2,
  },
];

export const mockOrdersMetrics: OrdersMetrics = {
  totalOrders: 8,
  deliveredOrders: 4,
  returnedOrders: 0,
  cancelledOrders: 1,
  pendingOrders: 1,
};

export const mockOrderItems: Record<string, OrderItem[]> = {
  "ORD-2024-0008": [
    {
      productId: "prod-001",
      productName: "Wireless Bluetooth Headphones",
      quantity: 1,
      price: 45000,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      variant: "Black",
    },
  ],
  "ORD-2024-0007": [
    {
      productId: "prod-003",
      productName: "Leather Crossbody Bag",
      quantity: 2,
      price: 70000,
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
      variant: "Brown",
    },
    {
      productId: "prod-006",
      productName: "Cotton T-Shirt Pack",
      quantity: 1,
      price: 18500,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      variant: "Assorted",
    },
  ],
  "ORD-2024-0006": [
    {
      productId: "prod-002",
      productName: "Smart Watch Pro",
      quantity: 5,
      price: 445000,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      variant: "Black",
    },
    {
      productId: "prod-007",
      productName: "Portable Power Bank",
      quantity: 2,
      price: 31000,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
      variant: "White",
    },
  ],
  "ORD-2024-0005": [
    {
      productId: "prod-004",
      productName: "Organic Green Tea Set",
      quantity: 3,
      price: 37500,
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
      variant: "Assorted",
    },
    {
      productId: "prod-009",
      productName: "Ceramic Coffee Mug Set",
      quantity: 2,
      price: 28000,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=300&fit=crop",
      variant: "Hand-painted",
    },
  ],
  "ORD-2024-0004": [
    {
      productId: "prod-008",
      productName: "Yoga Mat Premium",
      quantity: 2,
      price: 19000,
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
      variant: "Purple",
    },
  ],
  "ORD-2024-0003": [
    {
      productId: "prod-010",
      productName: "Natural Skincare Set",
      quantity: 1,
      price: 28500,
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      variant: "Standard",
    },
  ],
  "ORD-2024-0002": [
    {
      productId: "prod-005",
      productName: "Minimalist Desk Lamp",
      quantity: 3,
      price: 66000,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
      variant: "Matte Black",
    },
  ],
  "ORD-2024-0001": [
    {
      productId: "prod-002",
      productName: "Smart Watch Pro",
      quantity: 1,
      price: 89000,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      variant: "Silver",
    },
    {
      productId: "prod-007",
      productName: "Portable Power Bank",
      quantity: 1,
      price: 15500,
      image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=300&fit=crop",
      variant: "Black",
    },
  ],
};

// ---------------------------------------------------------------------------
// Notifications (exact data from Bootstrap MOCK_NOTIFICATIONS)
// ---------------------------------------------------------------------------
export let mockNotifications: NotificationItem[] = [
  {
    id: "notif-001",
    title: "New Order Received",
    message: "Order #ORD-2024-0008 has been placed by Emeka Okafor",
    createdAt: "2024-06-17T09:35:00.000Z",
    type: "order",
    isRead: false,
  },
  {
    id: "notif-002",
    title: "Payment Confirmed",
    message: "Payment of ₦380,000 for order #ORD-2024-0007 has been confirmed",
    createdAt: "2024-06-16T14:00:00.000Z",
    type: "payment",
    isRead: false,
  },
  {
    id: "notif-003",
    title: "Low Stock Alert",
    message: "Leather Crossbody Bag is running low on stock (45 units remaining)",
    createdAt: "2024-06-14T10:00:00.000Z",
    type: "product",
    isRead: false,
  },
  {
    id: "notif-004",
    title: "Order Delivered",
    message: "Order #ORD-2024-0003 has been successfully delivered",
    createdAt: "2024-06-14T09:00:00.000Z",
    type: "order",
    isRead: true,
  },
  {
    id: "notif-005",
    title: "Profile Updated",
    message: "Your store profile has been successfully updated",
    createdAt: "2024-06-13T16:00:00.000Z",
    type: "system",
    isRead: true,
  },
  {
    id: "notif-006",
    title: "Payout Processed",
    message: "Your weekly payout of ₦520,000 has been processed",
    createdAt: "2024-06-12T10:00:00.000Z",
    type: "payment",
    isRead: true,
  },
  {
    id: "notif-007",
    title: "Product Approved",
    message: "Your product 'Natural Skincare Set' has been approved for sale",
    createdAt: "2024-06-11T09:00:00.000Z",
    type: "product",
    isRead: true,
  },
  {
    id: "notif-008",
    title: "Order Cancelled",
    message: "Order #ORD-2024-0004 has been cancelled by customer",
    createdAt: "2024-06-10T11:30:00.000Z",
    type: "order",
    isRead: true,
  },
];

// ---------------------------------------------------------------------------
// Categories (matching Bootstrap CATEGORIES)
// ---------------------------------------------------------------------------
export const mockCategories: Category[] = [
  {
    id: "cat-electronics",
    categoryName: "Electronics",
    description: "Electronic devices, gadgets, and accessories",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: "cat-fashion",
    categoryName: "Fashion",
    description: "Clothing, shoes, and fashion accessories",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
  },
  {
    id: "cat-home",
    categoryName: "Home & Living",
    description: "Home appliances, furniture, and decor",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
  },
  {
    id: "cat-food",
    categoryName: "Food & Beverages",
    description: "Food items, drinks, and grocery products",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
  },
  {
    id: "cat-beauty",
    categoryName: "Beauty",
    description: "Skincare, makeup, and personal care products",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
  },
  {
    id: "cat-sports",
    categoryName: "Sports & Fitness",
    description: "Sports equipment, gym gear, and fitness accessories",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop",
  },
];

export const mockBusinessCategories: BusinessCategory[] = [
  { id: "1", categoryName: "Electronics & Technology" },
  { id: "2", categoryName: "Fashion & Apparel" },
  { id: "3", categoryName: "Home & Living" },
  { id: "4", categoryName: "Beauty & Personal Care" },
  { id: "5", categoryName: "Food & Groceries" },
  { id: "6", categoryName: "Sports & Outdoors" },
  { id: "7", categoryName: "Books & Stationery" },
  { id: "8", categoryName: "Automotive" },
  { id: "9", categoryName: "Health & Wellness" },
  { id: "10", categoryName: "Baby & Kids" },
];

// ---------------------------------------------------------------------------
// Dashboard Stats (exact data from Bootstrap MOCK_STATS)
// ---------------------------------------------------------------------------
export const mockDashboardStats = {
  totalProducts: 48,
  totalOrders: 156,
  pendingOrders: 12,
  totalRevenue: 2450000,
  totalCustomers: 892,
  revenueGrowth: 23.5,
  ordersGrowth: 18.2,
  productsGrowth: 8.5,
  customersGrowth: 15.8,
  deliveredOrders: 4,
  processingOrders: 1,
  lowStockProducts: 0,
  outOfStockProducts: 0,
  activeProducts: 10,
  inactiveProducts: 0,
};

// ---------------------------------------------------------------------------
// Storefront Data
// ---------------------------------------------------------------------------
export const mockStorefrontProducts = mockProducts.filter(p => p.isActive).slice(0, 6);

export const mockStorefrontBestSellers = mockProducts.slice(0, 4);

export const mockStorefrontCategories = mockCategories.map(cat => ({
  ...cat,
  productCount: mockProducts.filter(p => p.categoryId === cat.id).length
}));
