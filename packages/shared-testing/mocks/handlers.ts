import { http, HttpResponse } from "msw";
import { mockUser, mockAdminUser, mockProduct } from "../utils/test-utils";

// API route handlers for MSW
export const handlers = [
  // Auth endpoints
  http.post("/api/auth/signin", () => {
    return HttpResponse.json({
      success: true,
      user: mockUser,
    });
  }),

  http.post("/api/auth/signout", () => {
    return HttpResponse.json({
      success: true,
    });
  }),

  http.get("/api/auth/session", () => {
    return HttpResponse.json({
      user: mockUser,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    });
  }),

  // User endpoints
  http.get("/api/users/:id", ({ params }) => {
    const { id } = params;
    const user = id === "admin" ? mockAdminUser : mockUser;
    
    return HttpResponse.json({
      success: true,
      data: user,
    });
  }),

  http.get("/api/users", () => {
    return HttpResponse.json({
      success: true,
      data: {
        data: [mockUser, mockAdminUser],
        meta: {
          page: 1,
          limit: 10,
          total: 2,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      },
    });
  }),

  // Product endpoints
  http.get("/api/products", ({ request }) => {
    const url = new URL(request.url);
    const search = url.searchParams.get("search");
    
    let products = [mockProduct];
    
    if (search) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    return HttpResponse.json({
      success: true,
      data: {
        data: products,
        meta: {
          page: 1,
          limit: 12,
          total: products.length,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      },
    });
  }),

  http.get("/api/products/:id", ({ params }) => {
    const { id } = params;
    
    if (id === mockProduct.id) {
      return HttpResponse.json({
        success: true,
        data: mockProduct,
      });
    }
    
    return HttpResponse.json(
      {
        success: false,
        error: "Product not found",
      },
      { status: 404 }
    );
  }),

  http.post("/api/products", async ({ request }) => {
    const body = await request.json();
    
    const newProduct = {
      ...mockProduct,
      id: "new-product-id",
      ...(body as any),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return HttpResponse.json({
      success: true,
      data: newProduct,
    });
  }),

  http.put("/api/products/:id", async ({ params, request }) => {
    const { id } = params;
    const body = await request.json();
    
    if (id === mockProduct.id) {
      const updatedProduct = {
        ...mockProduct,
        ...(body as any),
        updatedAt: new Date(),
      };

      return HttpResponse.json({
        success: true,
        data: updatedProduct,
      });
    }
    
    return HttpResponse.json(
      {
        success: false,
        error: "Product not found",
      },
      { status: 404 }
    );
  }),

  http.delete("/api/products/:id", ({ params }) => {
    const { id } = params;
    
    if (id === mockProduct.id) {
      return HttpResponse.json({
        success: true,
        data: true,
      });
    }
    
    return HttpResponse.json(
      {
        success: false,
        error: "Product not found",
      },
      { status: 404 }
    );
  }),

  // Error handlers
  http.get("/api/error", () => {
    return HttpResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 }
    );
  }),

  // Catch-all handler
  http.all("*", ({ request }) => {
    console.warn(`Unhandled ${request.method} request to ${request.url}`);
    return HttpResponse.json(
      {
        success: false,
        error: "Not found",
      },
      { status: 404 }
    );
  }),
];
