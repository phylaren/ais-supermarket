import { Router } from 'express';
import * as receiptController from '../controllers/receiptController.js';

const router = Router();

router.get('/', receiptController.getAll);
router.post('/', receiptController.insertData);
router.delete('/:id_check', receiptController.deleteReceipt);
router.patch('/:id_check', receiptController.updateData);

router.get('/report-cashier', receiptController.getCashierReport);
router.get('/sales-report', receiptController.getGeneralSalesReport);
router.get('/daily-cashier-report', receiptController.getCashierDailyReport);
router.get('/by-id/:id', receiptController.getReceiptDetails);
router.get('/cashier-revenue', receiptController.getCashierTotalRevenue);
router.get('/total-revenue', receiptController.getTotalRevenue);

export default router;