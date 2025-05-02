import { Router } from 'express';
import { getAllProblems } from '../controllers/problemController';
import { getProgress, updateProgress } from '../controllers/userProgressController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();

// Problems
router.get('/', authMiddleware, getAllProblems);

export default router;