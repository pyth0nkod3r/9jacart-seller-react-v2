/**
 * Comprehensive Mock Data
 * 
 * This file contains all mock data for the application.
 * All API calls are replaced with this mock data.
 * 
 * Images are sourced from Unsplash (free to use).
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
// Image URLs - Using Unsplash (free to use)
// ---------------------------------------------------------------------------
export const IMAGES = {
  // Product images - Electronics
  phones: [
    "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
  ],
  // Accessories
  accessories: [
    "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1608156639585-b3a7a6e98d0a?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1601524909162-ae8725290836?w=400&h=400&fit=crop",
  ],
  // Fashion
  fashion: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  ],
  // Home & Living
  home: [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  ],
  // Beauty
  beauty: [
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
  ],
  // Profile avatars
  avatars: [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop",
  ],
  // Business logos
  logos: [
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1471341971476-ae15ff5dd4ea?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1541562232579-512a21360f5a?w=200&h=200&fit=crop",
  ],
  // Hero/Dashboard images
  hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  dashboard: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
  // Placeholder
  placeholder: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400&h=400&fit=crop",
};

// ---------------------------------------------------------------------------
// Vendor / Auth
// ---------------------------------------------------------------------------
export const MOCK_TOKEN = "mock-jwt-token-seller-2024";
export const MOCK_VENDOR_ID = "vendor-001";

export let mockVendorProfile: VendorProfile = {
  vendorId: MOCK_VENDOR_ID,
  account: {
    emailAddress: "vendor@example.com",
    fullName: "Chukwuemeka Adeyemi",
    phoneNumber: "+234 801 234 5678",
    profileImage: IMAGES.avatars[0],
  },
  accountInfo: {
    accountName: "Chukwuemeka Adeyemi",
    accountNumber: "0123456789",
    bank: "First Bank of Nigeria",
  },
  business: {
    businessName: "Adeyemi Electronics Store",
    businessCategory: "Electronics",
    businessRegNumber: "RC-123456",
    storeName: "Adeyemi Tech Hub",
    businessAddress: "12 Broad Street, Lagos Island, Lagos, Nigeria",
    taxIdNumber: "TIN-987654321",
    idDocument: "",
    businessRegCertificate: "",
  },
  storefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
  createdAt: "2024-01-10T08:00:00.000Z",
  updatedAt: "2024-06-15T12:30:00.000Z",
};

export let mockLogoUrl: string | null = IMAGES.logos[0];

// ---------------------------------------------------------------------------
// Products
// ---------------------------------------------------------------------------
export let mockProducts: Product[] = [
  {
    productId: "prod-001",
    productName: "Samsung Galaxy S24 Ultra",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: " flagship smartphone with 200MP camera, S Pen support, and AI features. 6.8\" Dynamic AMOLED display with 120Hz refresh rate.",
    productTags: ["samsung", "smartphone", "android", "flagship"],
    unitPrice: "750000",
    discountType: "percentage",
    discountValue: "5",
    discountPrice: "712500",
    stock: "15",
    minStock: "5",
    images: [IMAGES.phones[0], IMAGES.phones[1]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-03-01T09:00:00.000Z",
    updatedAt: "2024-06-10T11:00:00.000Z",
  },
  {
    productId: "prod-002",
    productName: "iPhone 15 Pro Max",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "Apple's most powerful iPhone with A17 Pro chip, titanium design, and advanced camera system with 5x optical zoom.",
    productTags: ["apple", "iphone", "smartphone", "flagship"],
    unitPrice: "850000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "850000",
    stock: "8",
    minStock: "3",
    images: [IMAGES.phones[1]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-03-15T10:00:00.000Z",
    updatedAt: "2024-06-11T14:00:00.000Z",
  },
  {
    productId: "prod-003",
    productName: "Sony WH-1000XM5 Headphones",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "Premium wireless noise-canceling headphones with 30-hour battery life, multipoint connection, and crystal-clear calls.",
    productTags: ["sony", "headphones", "audio", "wireless"],
    unitPrice: "185000",
    discountType: "fixed",
    discountValue: "15000",
    discountPrice: "170000",
    stock: "3",
    minStock: "5",
    images: [IMAGES.accessories[0]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-04-01T08:30:00.000Z",
    updatedAt: "2024-06-12T09:00:00.000Z",
  },
  {
    productId: "prod-004",
    productName: "Apple MacBook Pro 14\"",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "M3 Pro chip, 18GB RAM, 512GB SSD. Stunning Liquid Retina XDR display with ProMotion technology.",
    productTags: ["apple", "laptop", "macbook", "professional"],
    unitPrice: "1450000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "1450000",
    stock: "4",
    minStock: "2",
    images: [IMAGES.phones[2]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-04-20T12:00:00.000Z",
    updatedAt: "2024-06-13T10:00:00.000Z",
  },
  {
    productId: "prod-005",
    productName: "Logitech MX Master 3S",
    categoryId: "cat-accessories",
    categoryName: "Accessories",
    productDescription: "Advanced wireless mouse with MagSpeed scrolling, 8K DPI sensor, and USB-C quick charging. Works on any surface.",
    productTags: ["logitech", "mouse", "wireless", "productivity"],
    unitPrice: "55000",
    discountType: "percentage",
    discountValue: "10",
    discountPrice: "49500",
    stock: "25",
    minStock: "10",
    images: [IMAGES.accessories[1]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-01T09:00:00.000Z",
    updatedAt: "2024-06-14T15:00:00.000Z",
  },
  {
    productId: "prod-006",
    productName: "JBL Flip 6 Speaker",
    categoryId: "cat-electronics",
    categoryName: "Electronics",
    productDescription: "Portable Bluetooth speaker with powerful bass, IP67 waterproof rating, and 12 hours of playtime.",
    productTags: ["jbl", "speaker", "bluetooth", "portable"],
    unitPrice: "45000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "45000",
    stock: "0",
    minStock: "5",
    images: [IMAGES.accessories[2]],
    isActive: false,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-10T14:00:00.000Z",
    updatedAt: "2024-06-15T10:00:00.000Z",
  },
  {
    productId: "prod-007",
    productName: "Leather Laptop Bag",
    categoryId: "cat-accessories",
    categoryName: "Accessories",
    productDescription: "Premium genuine leather laptop bag with padded compartment for 15.6\" laptops, multiple pockets, and adjustable strap.",
    productTags: ["bag", "leather", "laptop", "premium"],
    unitPrice: "35000",
    discountType: "percentage",
    discountValue: "15",
    discountPrice: "29750",
    stock: "12",
    minStock: "3",
    images: [IMAGES.accessories[3]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-15T11:00:00.000Z",
    updatedAt: "2024-06-16T09:00:00.000Z",
  },
  {
    productId: "prod-008",
    productName: "Nike Air Max 270",
    categoryId: "cat-fashion",
    categoryName: "Fashion",
    productDescription: "Comfortable lifestyle sneakers with Max Air unit for cushioning. Available in multiple colors.",
    productTags: ["nike", "sneakers", "shoes", "fashion"],
    unitPrice: "65000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "65000",
    stock: "20",
    minStock: "5",
    images: [IMAGES.fashion[0]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-20T08:00:00.000Z",
    updatedAt: "2024-06-17T12:00:00.000Z",
  },
  {
    productId: "prod-009",
    productName: "Dyson V15 Detect",
    categoryId: "cat-home",
    categoryName: "Home & Living",
    productDescription: "Cordless vacuum cleaner with laser dust detection, LCD screen showing real-time dust analysis, and 60 minutes runtime.",
    productTags: ["dyson", "vacuum", "home", "technology"],
    unitPrice: "380000",
    discountType: "fixed",
    discountValue: "30000",
    discountPrice: "350000",
    stock: "6",
    minStock: "2",
    images: [IMAGES.home[0]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-05-25T10:00:00.000Z",
    updatedAt: "2024-06-18T14:00:00.000Z",
  },
  {
    productId: "prod-010",
    productName: "La Mer Moisturizing Cream",
    categoryId: "cat-beauty",
    categoryName: "Beauty",
    productDescription: "Luxury face cream with cell-renewing Miracle Broth™. Deeply hydrates and improves skin texture.",
    productTags: ["lamer", "skincare", "luxury", "beauty"],
    unitPrice: "95000",
    discountType: "none",
    discountValue: "0",
    discountPrice: "95000",
    stock: "10",
    minStock: "3",
    images: [IMAGES.beauty[0]],
    isActive: true,
    vendorId: MOCK_VENDOR_ID,
    vendorStorefrontUrl: `https://marketplace.com/store/${MOCK_VENDOR_ID}`,
    createdAt: "2024-06-01T09:00:00.000Z",
    updatedAt: "2024-06-19T11:00:00.000Z",
  },
];

// ---------------------------------------------------------------------------
// Orders
// ---------------------------------------------------------------------------
export const mockOrders: Order[] = [
  {
    orderNo: "ORD-2024-0001",
    totalAmount: 712500,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Amaka Okafor",
    customerEmail: "amaka.okafor@email.com",
    customerPhone: "+234 802 345 6789",
    shippingAddress: "15 Adeniran Ogunsanya Street, Surulere, Lagos",
    orderEarning: 675000,
    createdAt: "2024-06-01T14:22:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0002",
    totalAmount: 234500,
    status: "pending",
    paymentMethod: "transfer",
    paymentStatus: "pending",
    customerName: "Babatunde Adeola",
    customerEmail: "babs.adeola@email.com",
    customerPhone: "+234 803 456 7890",
    shippingAddress: "42 Allen Avenue, Ikeja, Lagos",
    orderEarning: 220000,
    createdAt: "2024-06-05T09:10:00.000Z",
    totalItemsCount: 2,
  },
  {
    orderNo: "ORD-2024-0003",
    totalAmount: 170000,
    status: "processing",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Chiamaka Eze",
    customerEmail: "chia.eze@email.com",
    customerPhone: "+234 804 567 8901",
    shippingAddress: "8 GRA Phase 2, Port Harcourt, Rivers",
    orderEarning: 160000,
    createdAt: "2024-06-10T11:45:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0004",
    totalAmount: 55000,
    status: "cancelled",
    paymentMethod: "wallet",
    paymentStatus: "refunded",
    customerName: "David Nwosu",
    customerEmail: "david.nwosu@email.com",
    customerPhone: "+234 805 678 9012",
    shippingAddress: "33 Independence Layout, Enugu",
    orderEarning: 0,
    createdAt: "2024-06-11T16:00:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0005",
    totalAmount: 99250,
    status: "shipped",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Emeka Obi",
    customerEmail: "emeka.obi@email.com",
    customerPhone: "+234 806 789 0123",
    shippingAddress: "7 Trans Amadi Industrial Layout, Port Harcourt",
    orderEarning: 92000,
    createdAt: "2024-06-14T08:30:00.000Z",
    totalItemsCount: 2,
  },
  {
    orderNo: "ORD-2024-0006",
    totalAmount: 1450000,
    status: "pending",
    paymentMethod: "transfer",
    paymentStatus: "pending",
    customerName: "Funke Adebayo",
    customerEmail: "funke.adebayo@email.com",
    customerPhone: "+234 807 890 1234",
    shippingAddress: "22 Banana Island, Ikoyi, Lagos",
    orderEarning: 1375000,
    createdAt: "2024-06-15T10:15:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0007",
    totalAmount: 380000,
    status: "delivered",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Grace Okonkwo",
    customerEmail: "grace.okonkwo@email.com",
    customerPhone: "+234 808 901 2345",
    shippingAddress: "5 Maitama District, Abuja",
    orderEarning: 355000,
    createdAt: "2024-06-16T13:45:00.000Z",
    totalItemsCount: 1,
  },
  {
    orderNo: "ORD-2024-0008",
    totalAmount: 29750,
    status: "processing",
    paymentMethod: "card",
    paymentStatus: "paid",
    customerName: "Henry Eromosele",
    customerEmail: "henry.ero@email.com",
    customerPhone: "+234 809 012 3456",
    shippingAddress: "18 Sapele Road, Benin City, Edo",
    orderEarning: 27000,
    createdAt: "2024-06-17T09:30:00.000Z",
    totalItemsCount: 1,
  },
];

export const mockOrdersMetrics: OrdersMetrics = {
  totalOrders: 8,
  deliveredOrders: 2,
  returnedOrders: 0,
  cancelledOrders: 1,
  pendingOrders: 2,
};

export const mockOrderItems: Record<string, OrderItem[]> = {
  "ORD-2024-0001": [
    { 
      productId: "prod-001", 
      productName: "Samsung Galaxy S24 Ultra", 
      quantity: 1, 
      price: 712500, 
      image: IMAGES.phones[0],
      variant: "Phantom Black 256GB"
    },
  ],
  "ORD-2024-0002": [
    { 
      productId: "prod-003", 
      productName: "Sony WH-1000XM5 Headphones", 
      quantity: 1, 
      price: 170000, 
      image: IMAGES.accessories[0],
      variant: "Silver"
    },
    { 
      productId: "prod-005", 
      productName: "Logitech MX Master 3S", 
      quantity: 1, 
      price: 49500, 
      image: IMAGES.accessories[1],
      variant: "Graphite"
    },
  ],
  "ORD-2024-0003": [
    { 
      productId: "prod-003", 
      productName: "Sony WH-1000XM5 Headphones", 
      quantity: 1, 
      price: 170000, 
      image: IMAGES.accessories[0],
      variant: "Black"
    },
  ],
  "ORD-2024-0004": [
    { 
      productId: "prod-005", 
      productName: "Logitech MX Master 3S", 
      quantity: 1, 
      price: 55000, 
      image: IMAGES.accessories[1],
      variant: "Pale Gray"
    },
  ],
  "ORD-2024-0005": [
    { 
      productId: "prod-007", 
      productName: "Leather Laptop Bag", 
      quantity: 2, 
      price: 29750, 
      image: IMAGES.accessories[3],
      variant: "Brown"
    },
    { 
      productId: "prod-005", 
      productName: "Logitech MX Master 3S", 
      quantity: 1, 
      price: 49500, 
      image: IMAGES.accessories[1],
      variant: "Graphite"
    },
  ],
  "ORD-2024-0006": [
    { 
      productId: "prod-004", 
      productName: "Apple MacBook Pro 14\"", 
      quantity: 1, 
      price: 1450000, 
      image: IMAGES.phones[2],
      variant: "Space Black M3 Pro"
    },
  ],
  "ORD-2024-0007": [
    { 
      productId: "prod-009", 
      productName: "Dyson V15 Detect", 
      quantity: 1, 
      price: 350000, 
      image: IMAGES.home[0],
      variant: "Yellow/Nickel"
    },
  ],
  "ORD-2024-0008": [
    { 
      productId: "prod-007", 
      productName: "Leather Laptop Bag", 
      quantity: 1, 
      price: 29750, 
      image: IMAGES.accessories[3],
      variant: "Black"
    },
  ],
};

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------
export let mockNotifications: NotificationItem[] = [
  {
    id: "notif-001",
    title: "New Order Received",
    message: "You have received a new order ORD-2024-0008 from Henry Eromosele for ₦29,750.",
    createdAt: "2024-06-17T09:35:00.000Z",
    type: "order",
    isRead: false,
  },
  {
    id: "notif-002",
    title: "Payment Confirmed",
    message: "Payment of ₦380,000 for order ORD-2024-0007 has been confirmed and credited to your wallet.",
    createdAt: "2024-06-16T14:00:00.000Z",
    type: "payment",
    isRead: false,
  },
  {
    id: "notif-003",
    title: "New Order Received",
    message: "You have received a new order ORD-2024-0006 from Funke Adebayo for ₦1,450,000.",
    createdAt: "2024-06-15T10:20:00.000Z",
    type: "order",
    isRead: false,
  },
  {
    id: "notif-004",
    title: "Low Stock Alert",
    message: "Sony WH-1000XM5 Headphones is running low on stock (3 remaining). Consider restocking soon.",
    createdAt: "2024-06-14T10:00:00.000Z",
    type: "product",
    isRead: true,
  },
  {
    id: "notif-005",
    title: "Order Shipped",
    message: "Order ORD-2024-0005 has been shipped and is on its way to Emeka Obi.",
    createdAt: "2024-06-14T09:00:00.000Z",
    type: "order",
    isRead: true,
  },
  {
    id: "notif-006",
    title: "Product Deactivated",
    message: "JBL Flip 6 Speaker has been automatically deactivated due to being out of stock.",
    createdAt: "2024-06-13T16:00:00.000Z",
    type: "product",
    isRead: true,
  },
  {
    id: "notif-007",
    title: "Order Delivered",
    message: "Order ORD-2024-0001 has been successfully delivered to Amaka Okafor.",
    createdAt: "2024-06-02T11:30:00.000Z",
    type: "order",
    isRead: true,
  },
  {
    id: "notif-008",
    title: "Payment Received",
    message: "Payment of ₦712,500 for order ORD-2024-0001 has been confirmed.",
    createdAt: "2024-06-01T14:45:00.000Z",
    type: "payment",
    isRead: true,
  },
];

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------
export const mockCategories: Category[] = [
  { 
    id: "cat-electronics", 
    categoryName: "Electronics", 
    description: "Electronic devices, gadgets, and accessories",
    image: IMAGES.phones[0]
  },
  { 
    id: "cat-accessories", 
    categoryName: "Accessories", 
    description: "Phone and computer accessories, bags, and peripherals",
    image: IMAGES.accessories[0]
  },
  { 
    id: "cat-fashion", 
    categoryName: "Fashion", 
    description: "Clothing, shoes, and fashion accessories",
    image: IMAGES.fashion[0]
  },
  { 
    id: "cat-home", 
    categoryName: "Home & Living", 
    description: "Home appliances, furniture, and decor",
    image: IMAGES.home[0]
  },
  { 
    id: "cat-beauty", 
    categoryName: "Beauty", 
    description: "Skincare, makeup, and personal care products",
    image: IMAGES.beauty[0]
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
// Dashboard Stats
// ---------------------------------------------------------------------------
export const mockDashboardStats = {
  totalProducts: 10,
  totalOrders: 8,
  pendingOrders: 2,
  totalRevenue: 3135000,
  deliveredOrders: 2,
  processingOrders: 2,
  lowStockProducts: 1,
  outOfStockProducts: 1,
  activeProducts: 8,
  inactiveProducts: 2,
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
