//routeSales.js
//second route level
import express from 'express';
import {getSales} from '../controllers/sales.controller.js'
const router = express.Router();
router.get('/overview', getSales)


export default router;
