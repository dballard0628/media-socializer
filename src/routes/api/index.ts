import { Router } from 'express';
const router = Router();
import postRoutes from './thoughtRoutes';
import userRoutes from './userRoutes';

router.use('/thoughts', postRoutes);
router.use('/users', userRoutes);

export default router;