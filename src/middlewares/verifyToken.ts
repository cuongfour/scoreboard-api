import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

// Nạp biến môi trường từ file .env
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET || 'default_secret_key';  // Nếu không có JWT_SECRET, dùng giá trị mặc định

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  // Lấy token từ header Authorization (thường có dạng: Bearer <token>)
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Kiểm tra nếu không có token
  if (!token) {
    res.status(403).send('Access denied');
    return;  // Trả về sau khi gửi phản hồi
  }

  try {
    // Kiểm tra tính hợp lệ của token mà không lưu thông tin vào req.user
    jwt.verify(token, SECRET_KEY);
    next();  // Tiến hành xử lý tiếp
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body; // Giả sử bạn lấy username và password từ request body

  // Kiểm tra thông tin người dùng (Ví dụ đơn giản: nếu username và password là "admin")
  if (username === 'admin' && password === 'password') {
    // Tạo payload cho token (có thể bao gồm thông tin người dùng)
    const payload = { username: 'admin' };

    // Tạo token, token này có thể có thời gian hết hạn (ví dụ: 1 giờ)
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    // Trả token về cho client
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
};