// Mock data for SAFINA CARPETS Admin Panel
import { DashboardStats, Product, Category, Customer, Order, CustomCarpetRequest, Inquiry, InternationalClient, SalesData, CategorySales } from '@/types';

export const mockDashboardStats: DashboardStats = {
  totalOrders: 1247,
  totalRevenue: 2840000,
  pendingOrders: 23,
  cancelledOrders: 18,
  totalCustomers: 876,
  totalProducts: 342,
  lowStockProducts: 12,
  customRequests: 8
};

export const mockSalesData: SalesData[] = [
  { date: '2024-01-01', sales: 45000, orders: 12 },
  { date: '2024-01-02', sales: 52000, orders: 15 },
  { date: '2024-01-03', sales: 38000, orders: 10 },
  { date: '2024-01-04', sales: 61000, orders: 18 },
  { date: '2024-01-05', sales: 55000, orders: 16 },
  { date: '2024-01-06', sales: 48000, orders: 13 },
  { date: '2024-01-07', sales: 67000, orders: 20 }
];

export const mockCategorySales: CategorySales[] = [
  { category: 'Persian Rugs', sales: 1200000, percentage: 35 },
  { category: 'Modern Carpets', sales: 850000, percentage: 25 },
  { category: 'Traditional Rugs', sales: 680000, percentage: 20 },
  { category: 'Prayer Mats', sales: 340000, percentage: 10 },
  { category: 'Custom Carpets', sales: 340000, percentage: 10 }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Persian Rugs',
    slug: 'persian-rugs',
    description: 'Authentic Persian rugs with traditional patterns',
    icon: '🏺',
    productCount: 87,
    isActive: true
  },
  {
    id: '2',
    name: 'Modern Carpets',
    slug: 'modern-carpets',
    description: 'Contemporary designs for modern homes',
    icon: '🎨',
    productCount: 64,
    isActive: true
  },
  {
    id: '3',
    name: 'Traditional Rugs',
    slug: 'traditional-rugs',
    description: 'Classic designs with heritage craftsmanship',
    icon: '🏛️',
    productCount: 92,
    isActive: true
  },
  {
    id: '4',
    name: 'Prayer Mats',
    slug: 'prayer-mats',
    description: 'Beautiful prayer mats for spiritual spaces',
    icon: '🕌',
    productCount: 45,
    isActive: true
  },
  {
    id: '5',
    name: 'Custom Carpets',
    slug: 'custom-carpets',
    description: 'Bespoke carpets made to order',
    icon: '✨',
    productCount: 23,
    isActive: true
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Royal Persian Silk Rug',
    sku: 'PR-001',
    category: 'Persian Rugs',
    size: '8x10 feet',
    material: 'Pure Silk',
    price: 125000,
    originalPrice: 150000,
    stock: 5,
    images: ['/placeholder.svg'],
    description: 'Exquisite hand-knotted Persian silk rug with intricate patterns',
    featured: true,
    status: 'active',
    tags: ['silk', 'hand-knotted', 'premium'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '2',
    name: 'Modern Abstract Carpet',
    sku: 'MC-002',
    category: 'Modern Carpets',
    size: '6x9 feet',
    material: 'Wool Blend',
    price: 45000,
    stock: 12,
    images: ['/placeholder.svg'],
    description: 'Contemporary abstract design perfect for modern interiors',
    featured: false,
    status: 'active',
    tags: ['modern', 'abstract', 'wool'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-18')
  }
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    email: 'rajesh.kumar@email.com',
    phone: '+91-9876543210',
    orders: [],
    wishlist: ['1', '2'],
    isBlocked: false,
    registeredAt: new Date('2024-01-01'),
    lastOrderAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Priya Sharma',
    email: 'priya.sharma@email.com',
    phone: '+91-9876543211',
    orders: [],
    wishlist: ['1'],
    isBlocked: false,
    registeredAt: new Date('2023-12-15'),
    lastOrderAt: new Date('2024-01-10')
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerId: '1',
    customerName: 'Rajesh Kumar',
    customerEmail: 'rajesh.kumar@email.com',
    items: [
      {
        productId: '1',
        productName: 'Royal Persian Silk Rug',
        sku: 'PR-001',
        quantity: 1,
        price: 125000,
        total: 125000
      }
    ],
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Credit Card',
    total: 147500,
    subtotal: 125000,
    tax: 22500,
    shipping: 0,
    shippingAddress: {
      name: 'Rajesh Kumar',
      phone: '+91-9876543210',
      street: '123 MG Road',
      city: 'New Delhi',
      state: 'Delhi',
      country: 'India',
      pincode: '110001'
    },
    trackingNumber: 'TRK123456789',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-16')
  }
];

export const mockCustomRequests: CustomCarpetRequest[] = [
  {
    id: 'CR-001',
    customerName: 'Amit Patel',
    customerEmail: 'amit.patel@email.com',
    customerPhone: '+91-9876543212',
    size: '10x12 feet',
    color: 'Deep Red with Gold accents',
    material: 'Pure Wool',
    pattern: 'Traditional Mughal',
    customMessage: 'Need this for my new home. Willing to wait for quality work.',
    budget: 80000,
    urgency: 'medium',
    status: 'pending',
    createdAt: new Date('2024-01-20')
  }
];

export const mockInquiries: Inquiry[] = [
  {
    id: 'INQ-001',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1-555-0123',
    subject: 'Bulk Order Inquiry',
    message: 'I am interested in purchasing 50 prayer mats for our mosque. Can you provide a quote?',
    type: 'product',
    status: 'unread',
    priority: 'high',
    createdAt: new Date('2024-01-22')
  }
];

export const mockInternationalClients: InternationalClient[] = [
  {
    id: 'IC-001',
    companyName: 'European Carpet Imports',
    contactPerson: 'Marco Rossi',
    email: 'marco@europeancarpets.it',
    phone: '+39-123-456-789',
    country: 'Italy',
    businessType: 'Wholesale',
    requiredQuantity: 200,
    productInterest: ['Persian Rugs', 'Traditional Rugs'],
    message: 'Looking for regular supplier of authentic Persian and traditional rugs for European market.',
    status: 'new',
    createdAt: new Date('2024-01-21')
  }
];

export const mockRecentOrders = mockOrders.slice(0, 5);