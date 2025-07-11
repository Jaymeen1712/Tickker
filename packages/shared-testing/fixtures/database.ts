// Database fixtures for testing
export const userFixtures = {
  standardUser: {
    id: "user-1",
    email: "user@example.com",
    name: "Standard User",
    roles: ["STANDARD"],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  adminUser: {
    id: "admin-1",
    email: "admin@example.com",
    name: "Admin User",
    roles: ["ADMIN"],
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
};

export const profileFixtures = {
  standardProfile: {
    id: "profile-1",
    userId: "user-1",
    name: "Standard User",
    email: "user@example.com",
    username: "standarduser",
    lowResImage: null,
    highResImage: null,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  adminProfile: {
    id: "profile-2",
    userId: "admin-1",
    name: "Admin User",
    email: "admin@example.com",
    username: "adminuser",
    lowResImage: null,
    highResImage: null,
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
};

export const productFixtures = {
  luxuryWatch: {
    id: "product-1",
    profileId: "profile-2",
    name: "Luxury Gold Watch",
    price: 1299.99,
    model: "LGW-001",
    description: "A stunning luxury gold watch with automatic movement",
    images: ["https://example.com/luxury-watch.jpg"],
    stock: 5,
    isVisible: true,
    brand: "LuxuryBrand",
    category: "Luxury",
    strap: "Gold",
    buckle: "Gold",
    strapSize: "22mm",
    movement: "Automatic",
    waterResistance: "100m",
    caseMaterial: "Gold",
    caseDiameter: "40mm",
    dialColor: "White",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  sportWatch: {
    id: "product-2",
    profileId: "profile-2",
    name: "Sport Digital Watch",
    price: 199.99,
    model: "SDW-002",
    description: "A durable sport watch with digital display",
    images: ["https://example.com/sport-watch.jpg"],
    stock: 15,
    isVisible: true,
    brand: "SportBrand",
    category: "Sport",
    strap: "Rubber",
    buckle: "Steel",
    strapSize: "20mm",
    movement: "Quartz",
    waterResistance: "200m",
    caseMaterial: "Titanium",
    caseDiameter: "44mm",
    dialColor: "Black",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
};

export const cartFixtures = {
  standardCart: {
    id: "cart-1",
    profileId: "profile-1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
};

export const cartItemFixtures = {
  luxuryWatchItem: {
    id: "cart-item-1",
    productId: "product-1",
    quantity: 1,
    cartId: "cart-1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  sportWatchItem: {
    id: "cart-item-2",
    productId: "product-2",
    quantity: 2,
    cartId: "cart-1",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
};

export const orderFixtures = {
  completedOrder: {
    id: "order-1",
    profileId: "profile-1",
    amount: 1699.97,
    paymentStatus: "COMPLETED",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  pendingOrder: {
    id: "order-2",
    profileId: "profile-1",
    amount: 199.99,
    paymentStatus: "PENDING",
    createdAt: new Date("2023-01-02"),
    updatedAt: new Date("2023-01-02"),
  },
};

export const orderItemFixtures = {
  luxuryWatchOrderItem: {
    id: "order-item-1",
    productId: "product-1",
    productOwnerId: "profile-2",
    orderId: "order-1",
    quantity: 1,
    price: 1299.99,
    status: "DELIVERED",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
  sportWatchOrderItem: {
    id: "order-item-2",
    productId: "product-2",
    productOwnerId: "profile-2",
    orderId: "order-1",
    quantity: 2,
    price: 199.99,
    status: "DELIVERED",
    createdAt: new Date("2023-01-01"),
    updatedAt: new Date("2023-01-01"),
  },
};

export const reviewFixtures = {
  positiveReview: {
    id: "review-1",
    comment: "Excellent watch! Great quality and fast shipping.",
    userId: "user-1",
    productId: "product-1",
    createdAt: new Date("2023-01-05"),
  },
  negativeReview: {
    id: "review-2",
    comment: "Not as expected. The quality could be better.",
    userId: "user-1",
    productId: "product-2",
    createdAt: new Date("2023-01-06"),
  },
};
