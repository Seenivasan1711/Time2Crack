import { createClient } from 'redis';
import { logger } from '../utils/logger.js';

// Create Redis client
const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || 'localhost'}:${process.env.REDIS_PORT || 6379}`
});

// Handle Redis errors
redisClient.on('error', (err) => {
  logger.error(`Redis Error: ${err.message}`);
});

export const initRedis = async () => {
  try {
    await redisClient.connect();
    logger.info('Redis client connected');
  } catch (error) {
    logger.error(`Redis connection failed: ${error.message}`);
    throw error;
  }
};

export const getCache = async (key) => {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    logger.error(`Redis get error: ${error.message}`);
    return null;
  }
};

export const setCache = async (key, value, expiration = 3600) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: expiration });
  } catch (error) {
    logger.error(`Redis set error: ${error.message}`);
  }
};

export const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    logger.error(`Redis delete error: ${error.message}`);
  }
};

export const invalidateCache = async (pattern) => {
  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.info(`Invalidated cache for pattern: ${pattern}`);
    }
  } catch (error) {
    logger.error(`Redis invalidate error: ${error.message}`);
  }
};

export default redisClient;