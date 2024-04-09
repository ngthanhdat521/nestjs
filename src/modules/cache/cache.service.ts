import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { ICacheService } from './cache.interface';
import { ConfigService } from '@nestjs/config';
import { RedisException } from '@app/common/exceptions/redis.exception';
import { RedisErrorMessage } from './cache.constant';

@Injectable()
export class CacheService extends ICacheService {
	private redis: Redis;

	constructor(private readonly config: ConfigService) {
		super();

		// Config redis
		this.redis = new Redis({
			port: this.config.get('REDIS_PORT'),
			host: this.config.get('REDIS_HOST'),
			db: this.config.get('REDIS_DB'),
			password: this.config.get('REDIS_PASSWORD'),
			keyPrefix: this.config.get('REDIS_PREFIX')
		});
	}

	/**
	 * Set cache by key
	 * @param key
	 * @param value
	 * @param expired
	 * @returns
	 */
	async set(key: string, value: string, expired: string | number): Promise<'OK'> {
		await this.delete(key);

		try {
			const item = await this.redis.set(key, value, 'EX', expired);
			return item;
		} catch (error) {
			throw new RedisException({
				cause: error,
				description: RedisErrorMessage.SET_FAILURE
			});
		}
	}

	/**
	 * Set cache by nx key
	 * @param key
	 * @param value
	 * @returns
	 */
	async setNx(key: string, value: string): Promise<number> {
		await this.delete(key);

		try {
			const item = await this.redis.setnx(key, value);
			return item;
		} catch (error) {
			throw new RedisException({
				cause: error,
				description: RedisErrorMessage.SETNX_FAILURE
			});
		}
	}

	/**
	 * Get cache by key
	 * @param key
	 * @returns
	 */
	async get(key: string): Promise<string | null> {
		try {
			const item = await this.redis.get(key);
			return item;
		} catch (error) {
			throw new RedisException({
				cause: error,
				description: RedisErrorMessage.GET_FAILURE
			});
		}
	}

	/**
	 * Delete cache by key
	 * @param key
	 * @returns
	 */
	async delete(key: string) {
		try {
			const deletedItem = await this.redis.del(key);
			return deletedItem;
		} catch (error) {
			throw new RedisException({
				cause: error,
				description: RedisErrorMessage.DELETE_FAILURE
			});
		}
	}

	/**
	 * Get cache by prefix
	 * @param prefix
	 * @returns
	 */
	async keys(prefix: string) {
		try {
			const data = await this.redis.keys(`${prefix}:*`);
			return data;
		} catch (error) {
			throw new RedisException({
				cause: error,
				description: RedisErrorMessage.GET_PREFIX_FAILURE
			});
		}
	}

	/**
	 * Get api key to save cache
	 * @param router
	 * @param method
	 * @param path
	 * @returns
	 */
	toApiKey(method: string, originalUrl: string) {
		originalUrl = originalUrl.replaceAll('?', ':').replaceAll('&', ':');

		return `${method}:${originalUrl}`;
	}

	/**
	 * Check if key is existed
	 * @param key
	 * @returns
	 */
	async exists(key: string): Promise<number | null> {
		try {
			const item = await this.redis.exists(key);
			return item;
		} catch (error) {
			throw new RedisException({
				cause: error,
				description: RedisErrorMessage.CHECK_EXISTS_FAILURE
			});
		}
	}

	/**
	 * Check if api key is existed
	 * @param key
	 * @returns
	 */
	async getByUrl(method: string, originalUrl: string): Promise<any | null> {
		const apiKey = this.toApiKey(method, originalUrl);
		const cachedData = await this.get(apiKey);

		if (cachedData) {
			return JSON.parse(cachedData);
		}

		return cachedData;
	}

	/**
	 * Check if api key is existed
	 * @param key
	 * @returns
	 */
	async setByUrl<T>(
		method: string,
		originalUrl: string,
		value: T,
		expired: string | number
	): Promise<'OK'> {
		const apiKey = this.toApiKey(method, originalUrl);

		return this.set(apiKey, JSON.stringify(value), expired);
	}

	/**
	 * Check if api key is existed
	 * @param key
	 * @returns
	 */
	async deleteByUrl(method: string, originalUrl: string): Promise<number> {
		const apiKey = this.toApiKey(method, originalUrl);

		return this.delete(apiKey);
	}
}
