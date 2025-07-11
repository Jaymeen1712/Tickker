import * as z from "zod";
export declare const ProductSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    price: z.ZodNumber;
    stock: z.ZodNumber;
    model: z.ZodString;
    brand: z.ZodEnum<["Rolex", "Omega", "Seiko", "Casio", "Citizen", "Tissot", "TAG Heuer", "Breitling", "Patek Philippe", "Audemars Piguet"]>;
    category: z.ZodEnum<["Luxury", "Sport", "Casual", "Dress", "Smart", "Vintage"]>;
    movement: z.ZodEnum<["Automatic", "Manual", "Quartz", "Solar", "Kinetic"]>;
    caseMaterial: z.ZodEnum<["Stainless Steel", "Gold", "Titanium", "Ceramic", "Carbon Fiber", "Aluminum"]>;
    strap: z.ZodEnum<["Leather", "Metal", "Rubber", "Fabric", "Silicone", "NATO"]>;
    waterResistance: z.ZodEnum<["30m", "50m", "100m", "200m", "300m", "500m", "1000m"]>;
    caseDiameter: z.ZodString;
    dialColor: z.ZodString;
    buckle: z.ZodString;
    strapSize: z.ZodString;
    isVisible: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    model: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    isVisible: boolean;
    brand: "Rolex" | "Omega" | "Seiko" | "Casio" | "Citizen" | "Tissot" | "TAG Heuer" | "Breitling" | "Patek Philippe" | "Audemars Piguet";
    category: "Luxury" | "Sport" | "Casual" | "Dress" | "Smart" | "Vintage";
    strap: "Leather" | "Metal" | "Rubber" | "Fabric" | "Silicone" | "NATO";
    buckle: string;
    strapSize: string;
    movement: "Automatic" | "Manual" | "Quartz" | "Solar" | "Kinetic";
    waterResistance: "30m" | "50m" | "100m" | "200m" | "300m" | "500m" | "1000m";
    caseMaterial: "Stainless Steel" | "Gold" | "Titanium" | "Ceramic" | "Carbon Fiber" | "Aluminum";
    caseDiameter: string;
    dialColor: string;
}, {
    model: string;
    name: string;
    price: number;
    description: string;
    stock: number;
    brand: "Rolex" | "Omega" | "Seiko" | "Casio" | "Citizen" | "Tissot" | "TAG Heuer" | "Breitling" | "Patek Philippe" | "Audemars Piguet";
    category: "Luxury" | "Sport" | "Casual" | "Dress" | "Smart" | "Vintage";
    strap: "Leather" | "Metal" | "Rubber" | "Fabric" | "Silicone" | "NATO";
    buckle: string;
    strapSize: string;
    movement: "Automatic" | "Manual" | "Quartz" | "Solar" | "Kinetic";
    waterResistance: "30m" | "50m" | "100m" | "200m" | "300m" | "500m" | "1000m";
    caseMaterial: "Stainless Steel" | "Gold" | "Titanium" | "Ceramic" | "Carbon Fiber" | "Aluminum";
    caseDiameter: string;
    dialColor: string;
    isVisible?: boolean | undefined;
}>;
export declare const ProductUpdateSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    price: z.ZodOptional<z.ZodNumber>;
    stock: z.ZodOptional<z.ZodNumber>;
    model: z.ZodOptional<z.ZodString>;
    brand: z.ZodOptional<z.ZodEnum<["Rolex", "Omega", "Seiko", "Casio", "Citizen", "Tissot", "TAG Heuer", "Breitling", "Patek Philippe", "Audemars Piguet"]>>;
    category: z.ZodOptional<z.ZodEnum<["Luxury", "Sport", "Casual", "Dress", "Smart", "Vintage"]>>;
    movement: z.ZodOptional<z.ZodEnum<["Automatic", "Manual", "Quartz", "Solar", "Kinetic"]>>;
    caseMaterial: z.ZodOptional<z.ZodEnum<["Stainless Steel", "Gold", "Titanium", "Ceramic", "Carbon Fiber", "Aluminum"]>>;
    strap: z.ZodOptional<z.ZodEnum<["Leather", "Metal", "Rubber", "Fabric", "Silicone", "NATO"]>>;
    waterResistance: z.ZodOptional<z.ZodEnum<["30m", "50m", "100m", "200m", "300m", "500m", "1000m"]>>;
    caseDiameter: z.ZodOptional<z.ZodString>;
    dialColor: z.ZodOptional<z.ZodString>;
    buckle: z.ZodOptional<z.ZodString>;
    strapSize: z.ZodOptional<z.ZodString>;
    isVisible: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, "strip", z.ZodTypeAny, {
    model?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    description?: string | undefined;
    stock?: number | undefined;
    isVisible?: boolean | undefined;
    brand?: "Rolex" | "Omega" | "Seiko" | "Casio" | "Citizen" | "Tissot" | "TAG Heuer" | "Breitling" | "Patek Philippe" | "Audemars Piguet" | undefined;
    category?: "Luxury" | "Sport" | "Casual" | "Dress" | "Smart" | "Vintage" | undefined;
    strap?: "Leather" | "Metal" | "Rubber" | "Fabric" | "Silicone" | "NATO" | undefined;
    buckle?: string | undefined;
    strapSize?: string | undefined;
    movement?: "Automatic" | "Manual" | "Quartz" | "Solar" | "Kinetic" | undefined;
    waterResistance?: "30m" | "50m" | "100m" | "200m" | "300m" | "500m" | "1000m" | undefined;
    caseMaterial?: "Stainless Steel" | "Gold" | "Titanium" | "Ceramic" | "Carbon Fiber" | "Aluminum" | undefined;
    caseDiameter?: string | undefined;
    dialColor?: string | undefined;
}, {
    model?: string | undefined;
    name?: string | undefined;
    price?: number | undefined;
    description?: string | undefined;
    stock?: number | undefined;
    isVisible?: boolean | undefined;
    brand?: "Rolex" | "Omega" | "Seiko" | "Casio" | "Citizen" | "Tissot" | "TAG Heuer" | "Breitling" | "Patek Philippe" | "Audemars Piguet" | undefined;
    category?: "Luxury" | "Sport" | "Casual" | "Dress" | "Smart" | "Vintage" | undefined;
    strap?: "Leather" | "Metal" | "Rubber" | "Fabric" | "Silicone" | "NATO" | undefined;
    buckle?: string | undefined;
    strapSize?: string | undefined;
    movement?: "Automatic" | "Manual" | "Quartz" | "Solar" | "Kinetic" | undefined;
    waterResistance?: "30m" | "50m" | "100m" | "200m" | "300m" | "500m" | "1000m" | undefined;
    caseMaterial?: "Stainless Steel" | "Gold" | "Titanium" | "Ceramic" | "Carbon Fiber" | "Aluminum" | undefined;
    caseDiameter?: string | undefined;
    dialColor?: string | undefined;
}>;
export declare const FileUploadSchema: z.ZodObject<{
    file: z.ZodEffects<z.ZodEffects<z.ZodType<File, z.ZodTypeDef, File>, File, File>, File, File>;
}, "strip", z.ZodTypeAny, {
    file: File;
}, {
    file: File;
}>;
export declare const ProductFilterSchema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<["Luxury", "Sport", "Casual", "Dress", "Smart", "Vintage"]>>;
    brand: z.ZodOptional<z.ZodEnum<["Rolex", "Omega", "Seiko", "Casio", "Citizen", "Tissot", "TAG Heuer", "Breitling", "Patek Philippe", "Audemars Piguet"]>>;
    movement: z.ZodOptional<z.ZodEnum<["Automatic", "Manual", "Quartz", "Solar", "Kinetic"]>>;
    caseMaterial: z.ZodOptional<z.ZodEnum<["Stainless Steel", "Gold", "Titanium", "Ceramic", "Carbon Fiber", "Aluminum"]>>;
    strap: z.ZodOptional<z.ZodEnum<["Leather", "Metal", "Rubber", "Fabric", "Silicone", "NATO"]>>;
    waterResistance: z.ZodOptional<z.ZodEnum<["30m", "50m", "100m", "200m", "300m", "500m", "1000m"]>>;
    priceMin: z.ZodOptional<z.ZodNumber>;
    priceMax: z.ZodOptional<z.ZodNumber>;
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodDefault<z.ZodEnum<["name", "price", "createdAt", "updatedAt"]>>;
    sortOrder: z.ZodDefault<z.ZodEnum<["asc", "desc"]>>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
    sortBy: "name" | "price" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    brand?: "Rolex" | "Omega" | "Seiko" | "Casio" | "Citizen" | "Tissot" | "TAG Heuer" | "Breitling" | "Patek Philippe" | "Audemars Piguet" | undefined;
    category?: "Luxury" | "Sport" | "Casual" | "Dress" | "Smart" | "Vintage" | undefined;
    strap?: "Leather" | "Metal" | "Rubber" | "Fabric" | "Silicone" | "NATO" | undefined;
    movement?: "Automatic" | "Manual" | "Quartz" | "Solar" | "Kinetic" | undefined;
    waterResistance?: "30m" | "50m" | "100m" | "200m" | "300m" | "500m" | "1000m" | undefined;
    caseMaterial?: "Stainless Steel" | "Gold" | "Titanium" | "Ceramic" | "Carbon Fiber" | "Aluminum" | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
}, {
    search?: string | undefined;
    brand?: "Rolex" | "Omega" | "Seiko" | "Casio" | "Citizen" | "Tissot" | "TAG Heuer" | "Breitling" | "Patek Philippe" | "Audemars Piguet" | undefined;
    category?: "Luxury" | "Sport" | "Casual" | "Dress" | "Smart" | "Vintage" | undefined;
    strap?: "Leather" | "Metal" | "Rubber" | "Fabric" | "Silicone" | "NATO" | undefined;
    movement?: "Automatic" | "Manual" | "Quartz" | "Solar" | "Kinetic" | undefined;
    waterResistance?: "30m" | "50m" | "100m" | "200m" | "300m" | "500m" | "1000m" | undefined;
    caseMaterial?: "Stainless Steel" | "Gold" | "Titanium" | "Ceramic" | "Carbon Fiber" | "Aluminum" | undefined;
    priceMin?: number | undefined;
    priceMax?: number | undefined;
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: "name" | "price" | "createdAt" | "updatedAt" | undefined;
    sortOrder?: "asc" | "desc" | undefined;
}>;
export declare const CartItemSchema: z.ZodObject<{
    productId: z.ZodString;
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    quantity: number;
}, {
    productId: string;
    quantity: number;
}>;
export declare const UpdateCartItemSchema: z.ZodObject<{
    quantity: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    quantity: number;
}, {
    quantity: number;
}>;
export declare const OrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodString;
        quantity: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        productId: string;
        quantity: number;
    }, {
        productId: string;
        quantity: number;
    }>, "many">;
    shippingAddress: z.ZodObject<{
        street: z.ZodString;
        city: z.ZodString;
        state: z.ZodString;
        zipCode: z.ZodString;
        country: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }, {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    }>;
    paymentMethod: z.ZodEnum<["credit_card", "paypal", "stripe"]>;
}, "strip", z.ZodTypeAny, {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: "credit_card" | "paypal" | "stripe";
}, {
    items: {
        productId: string;
        quantity: number;
    }[];
    shippingAddress: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    paymentMethod: "credit_card" | "paypal" | "stripe";
}>;
export declare const ReviewSchema: z.ZodObject<{
    productId: z.ZodString;
    comment: z.ZodString;
    rating: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    productId: string;
    comment: string;
    rating: number;
}, {
    productId: string;
    comment: string;
    rating: number;
}>;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    page: number;
    limit: number;
}, {
    page?: number | undefined;
    limit?: number | undefined;
}>;
export type ProductInput = z.infer<typeof ProductSchema>;
export type ProductUpdateInput = z.infer<typeof ProductUpdateSchema>;
export type ProductFilter = z.infer<typeof ProductFilterSchema>;
export type CartItemInput = z.infer<typeof CartItemSchema>;
export type OrderInput = z.infer<typeof OrderSchema>;
export type ReviewInput = z.infer<typeof ReviewSchema>;
export type PaginationInput = z.infer<typeof PaginationSchema>;
//# sourceMappingURL=validation.d.ts.map