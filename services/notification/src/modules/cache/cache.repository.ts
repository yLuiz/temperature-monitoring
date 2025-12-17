import { CacheRepositoryInterface } from './cache.repository.interface';

type CacheEntry<T> = {
    value: T;
    expiresAt?: number; // ms
};

class CacheRepository implements CacheRepositoryInterface {
    private cache = new Map<string, CacheEntry<any>>();

    async get<T>(key: string): Promise<T | null> {
        const entry = this.cache.get(key);

        if (!entry) {
            return null;
        }

        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            this.cache.delete(key);
            return null;
        }

        return entry.value as T;
    }

    async set<T>(
        key: string,
        value: T,
        ttlSeconds?: number
    ): Promise<void> {

        const expiresAt = ttlSeconds
            ? Date.now() + ttlSeconds * 1000
            : undefined;

        this.cache.set(key, {
            value,
            expiresAt,
        });
    }

    async delete(key: string): Promise<void> {
        this.cache.delete(key);
    }
}

export const CacheRepositoryInstance = new CacheRepository();
export type CacheRepositoryType = typeof CacheRepositoryInstance;