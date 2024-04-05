//routeAdmin.js

import express from 'express';
import {getAdmin,getAffiliateStat} from '../controllers/management.controller.js';
const router = express.Router();

router.get('/admin', getAdmin);
router.get('/performance',getAffiliateStat )
export default router
