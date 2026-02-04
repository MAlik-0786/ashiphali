import express from 'express';
import {
    getStats,
    addStat,
    updateStat,
    deleteStat
} from '../controllers/statController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getStats)
    .post(protect, authorize('admin'), addStat);

router.route('/:id')
    .put(protect, authorize('admin'), updateStat)
    .delete(protect, authorize('admin'), deleteStat);

export default router;
