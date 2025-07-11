// Simple in-memory cache implementation
class MemoryCache {
  private cache = new Map<string, { value: any; expiry: number }>();

  set(key: string, value: any, ttl: number = 300000): void {
    const expiry = Date.now() + ttl;
    this.cache.set(key, { value, expiry });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value;
  }

  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }

  // Clean up expired entries
  cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
      }
    }
  }
}

export const memoryCache = new MemoryCache();

// Cache decorator for functions
export function cached<T extends (...args: any[]) => any>(
  fn: T,
  options: {
    ttl?: number;
    keyGenerator?: (...args: Parameters<T>) => string;
  } = {}
): T {
  const { ttl = 300000, keyGenerator = (...args) => JSON.stringify(args) } = options;

  return ((...args: Parameters<T>) => {
    const key = `${fn.name}:${keyGenerator(...args)}`;
    const cached = memoryCache.get(key);

    if (cached !== null) {
      return cached;
    }

    const result = fn(...args);

    // Handle promises
    if (result instanceof Promise) {
      return result.then((value) => {
        memoryCache.set(key, value, ttl);
        return value;
      });
    }

    memoryCache.set(key, result, ttl);
    return result;
  }) as T;
}

// React Query-like cache invalidation
export function invalidateCache(pattern?: string): void {
  if (!pattern) {
    memoryCache.clear();
    return;
  }

  const regex = new RegExp(pattern);
  for (const key of memoryCache["cache"].keys()) {
    if (regex.test(key)) {
      memoryCache.delete(key);
    }
  }
}
