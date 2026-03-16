import express from 'express';
import * as settingController from '../controllers/apk.controller.js';

const router = express.Router();

router.get('/', settingController.getAllSettings);
router.get('/:key', settingController.getSetting);
router.post('/:key', settingController.updateOrCreateSetting);

export default router;