export declare function checkIsPublicRoute(pathname: string): boolean;
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    errors?: string[];
}
export declare function createSuccessResponse<T>(data: T): ApiResponse<T>;
export declare function createErrorResponse(error: string | string[]): ApiResponse;
export declare function handleAsyncOperation<T>(operation: () => Promise<T>): Promise<ApiResponse<T>>;
export declare function createSlug(text: string): string;
export declare function generateProductUrl(id: string, name: string): string;
export declare function calculateDiscountedPrice(originalPrice: number, discountPercentage: number): number;
export declare function calculateTax(amount: number, taxRate?: number): number;
export declare function calculateTotal(subtotal: number, tax?: number, shipping?: number): number;
export declare function chunk<T>(array: T[], size: number): T[][];
export declare function unique<T>(array: T[]): T[];
export declare function omit<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Omit<T, K>;
export declare function pick<T extends Record<string, any>, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
export declare function isDateInRange(date: Date, startDate: Date, endDate: Date): boolean;
export declare function addDays(date: Date, days: number): Date;
export declare function isValidEmail(email: string): boolean;
export declare function isValidUrl(url: string): boolean;
//# sourceMappingURL=helpers.d.ts.map