import { Request, Response } from 'express';
import client from '../models/scoreModel';

// Lấy danh sách top 10 người dùng có điểm cao nhất
export const getTopScores = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await client.query('SELECT * FROM scores ORDER BY score DESC LIMIT 10');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Cập nhật điểm cho người dùng
export const updateScore = async (req: Request, res: Response): Promise<void> => {
  const { userId, score } = req.body;

  if (!userId || score === undefined) {
    // Trả về một thông báo lỗi mà không cần trả về Response trực tiếp
    res.status(400).send('User ID and score are required');
    return;
  }

  try {
    const result = await client.query(
      'UPDATE scores SET score = $1 WHERE user_id = $2 RETURNING *',
      [score, userId]
    );

    if (result.rowCount === 0) {
      res.status(404).send('User not found');
      return;
    }

    res.json({ statusCode: 200, message: 'Score updated successfully', data: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
