import express from 'express';
import { createNotification, getAllNotifications, getNotificationById, updateNotification, deleteNotification } from '../controllers/notificationController.js';
import { createTemplate, getAllTemplates, getTemplateById, updateTemplate, deleteTemplate } from '../controllers/notificationTemplateController.js';

const router = express.Router();

router.post('/notification', createNotification);
router.get('/notification', getAllNotifications);
router.get('/notification', getNotificationById);
router.get('/notification', updateNotification);
router.get('/notification', deleteNotification);


router.post('/template', createTemplate);
router.get('/template', getAllTemplates);
router.get('/template', getTemplateById);
router.get('/template', updateTemplate);
router.get('/template', deleteTemplate);

export default router;