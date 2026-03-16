import express from 'express';
import * as userCardController from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', userCardController.getUserCards);
router.post('/', userCardController.createUserCard);
router.delete('/:id', userCardController.deleteUserCard);

export default router;