//routeAdmin.js

import express from 'express';
import getAdmin from '../controllers/management.controller.js';
const router = express.Router();

router.get('/admin', getAdmin);

export default router
