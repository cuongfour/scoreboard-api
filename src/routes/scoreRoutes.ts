import express from 'express';
import { getTopScores, updateScore } from '../controllers/scoreController';
import { verifyToken,login } from '../middlewares/verifyToken';

const router = express.Router();

// Route để lấy danh sách top 10 điểm cao nhất
router.get('/top', getTopScores);

router.post('/login', login);

// Route để cập nhật điểm số cho người dùng (được bảo vệ bằng JWT)
router.post('/update', verifyToken, updateScore);

export { router as scoreRoutes };
