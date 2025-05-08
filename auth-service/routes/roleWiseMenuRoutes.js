import express from 'express';
import { createRoleWiseMenu, getAllRoleWiseMenus, getRoleWiseMenuById, updateRoleWiseMenu, deleteRoleWiseMenu } from '../controllers/roleWiseMenuController.js';

const router = express.Router();

router.post('/', createRoleWiseMenu);
router.get('/', getAllRoleWiseMenus);
router.get('/:id', getRoleWiseMenuById);
router.put('/:id', updateRoleWiseMenu);
router.delete('/:id', deleteRoleWiseMenu);

export default router;