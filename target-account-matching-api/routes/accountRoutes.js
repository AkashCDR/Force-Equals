import express from 'express';
import authenticateToken from '../middlewares/auth.js';
import { 
  createCompany, 
  getCompanies, 
  updateCompanyStatus 
} from '../controllers/accountController.js';

const router = express.Router();

// All endpoints require authentication
router.post('/companies', authenticateToken, createCompany);
router.get('/accounts', authenticateToken, getCompanies);
router.post('/accounts/:id/status', authenticateToken, updateCompanyStatus);

export default router;