import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

// Mock providers for testing
interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders = ({ children }: AllTheProvidersProps) => {
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): ReturnType<typeof render> =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Mock user for testing
export const mockUser = {
  id: "test-user-id",
  email: "test@example.com",
  name: "Test User",
  roles: ["STANDARD"] as const,
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

export const mockAdminUser = {
  ...mockUser,
  id: "test-admin-id",
  email: "admin@example.com",
  name: "Admin User",
  roles: ["ADMIN"] as const,
};

// Mock product for testing
export const mockProduct = {
  id: "test-product-id",
  profileId: "test-profile-id",
  name: "Test Watch",
  price: 299.99,
  model: "TW-001",
  description: "A beautiful test watch",
  images: ["https://example.com/watch1.jpg"],
  stock: 10,
  isVisible: true,
  brand: "TestBrand",
  category: "Luxury",
  strap: "Leather",
  buckle: "Steel",
  strapSize: "20mm",
  movement: "Automatic",
  waterResistance: "50m",
  caseMaterial: "Stainless Steel",
  caseDiameter: "42mm",
  dialColor: "Black",
  createdAt: new Date("2023-01-01"),
  updatedAt: new Date("2023-01-01"),
};

// Test helpers
export const waitFor = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const createMockFunction = <T extends (...args: any[]) => any>(
  implementation?: T
) => {
  const fn = jest.fn(implementation);
  return fn as any; // Simplified type for compatibility
};

// Database test helpers
export const createTestDatabase = () => {
  // This would typically set up a test database
  // For now, we'll return mock functions
  return {
    user: {
      create: createMockFunction(),
      findUnique: createMockFunction(),
      findMany: createMockFunction(),
      update: createMockFunction(),
      delete: createMockFunction(),
    },
    product: {
      create: createMockFunction(),
      findUnique: createMockFunction(),
      findMany: createMockFunction(),
      update: createMockFunction(),
      delete: createMockFunction(),
    },
    order: {
      create: createMockFunction(),
      findUnique: createMockFunction(),
      findMany: createMockFunction(),
      update: createMockFunction(),
      delete: createMockFunction(),
    },
  };
};

// API test helpers
export const mockApiResponse = <T,>(data: T, success: boolean = true) => ({
  success,
  data: success ? data : undefined,
  error: success ? undefined : "Test error",
});

// Form test helpers
export const fillForm = async (
  getByLabelText: any,
  userEvent: any,
  formData: Record<string, string>
) => {
  for (const [label, value] of Object.entries(formData)) {
    const input = getByLabelText(new RegExp(label, "i"));
    await userEvent.clear(input);
    await userEvent.type(input, value);
  }
};

// Local storage mock
export const mockLocalStorage = () => {
  const store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key]);
    },
  };
};

// Session storage mock
export const mockSessionStorage = mockLocalStorage;

// Window mock
export const mockWindow = (overrides: Partial<Window> = {}) => {
  const mockWindow = {
    location: {
      href: "http://localhost:3000",
      pathname: "/",
      search: "",
      hash: "",
      ...overrides.location,
    },
    localStorage: mockLocalStorage(),
    sessionStorage: mockSessionStorage(),
    ...overrides,
  };

  Object.defineProperty(window, "location", {
    value: mockWindow.location,
    writable: true,
  });

  return mockWindow;
};
