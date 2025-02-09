import redis from 'redis';
import { promisify } from 'util';

// Kết nối Redis để lưu trữ dữ liệu tần suất yêu cầu
const client = redis.createClient({
  host: 'localhost', // hoặc cấu hình Redis của bạn
  port: 6379
});
const incrAsync = promisify(client.incr).bind(client);
const ttlAsync = promisify(client.ttl).bind(client);

// Giới hạn số lần yêu cầu của người dùng
export const rateLimiter = async (userId: string) => {
  const key = `rate-limit:${userId}`;
  const requests = await incrAsync(key);  // Tăng số lần yêu cầu

  if (requests === 1) {
    // Set thời gian sống của khóa (1 phút)
    client.expire(key, 60);  
  }

  // Giới hạn số lần yêu cầu (ví dụ: 5 yêu cầu trong 1 phút)
  if (requests > 5) {
    return 'Rate limit exceeded';
  }

  return null;
};
