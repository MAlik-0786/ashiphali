import express from 'express';
import {
    getSkills,
    addSkill,
    updateSkill,
    deleteSkill
} from '../controllers/skillController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getSkills)
    .post(protect, authorize('admin'), addSkill);

router.route('/:id')
    .put(protect, authorize('admin'), updateSkill)
    .delete(protect, authorize('admin'), deleteSkill);

export default router;
