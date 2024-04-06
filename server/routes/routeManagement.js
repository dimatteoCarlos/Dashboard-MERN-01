//routeAdmin.js

import express from 'express';
import {
  getAdmin,
  getAffiliateStat,
  getUserPerformance,
} from '../controllers/management.controller.js';
const router = express.Router();

router.get('/admin', getAdmin);
router.get('/affiliatestat', getAffiliateStat);
// router.get('/performance', getAffiliateStat);
router.get('/performance/:id', getUserPerformance);
export default router;
