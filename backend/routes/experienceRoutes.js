import express from 'express';
import {
    getExperiences,
    addExperience,
    updateExperience,
    deleteExperience
} from '../controllers/experienceController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getExperiences)
    .post(protect, authorize('admin'), addExperience);

router.route('/:id')
    .put(protect, authorize('admin'), updateExperience)
    .delete(protect, authorize('admin'), deleteExperience);

export default router;
