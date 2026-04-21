import { Router } from 'express';
import * as receiptController from '../controllers/receiptController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verifyToken,  checkRole(['Менеджер']), receiptController.getReceipts);
router.get('/my-receipts', verifyToken, checkRole(['Касир']), receiptController.getReceiptsByEmployee);

router.post('/', verifyToken, checkRole(['Касир']), receiptController.insertData);
router.delete('/:id_check', verifyToken, checkRole(['Менеджер']), receiptController.deleteReceipt);
router.patch('/:id_check', receiptController.updateData);

router.get('/report-cashier', verifyToken, checkRole(['Менеджер', 'Касир']), receiptController.getCashierReport);
router.get('/sales-report', verifyToken, checkRole(['Менеджер']), receiptController.getGeneralSalesReport);
router.get('/daily-cashier-report', verifyToken, checkRole(['Касир', 'Менеджер']), receiptController.getCashierDailyReport);
router.get('/by-id/:id', verifyToken, checkRole(['Менеджер', 'Касир']), receiptController.getReceiptDetails);
router.get('/cashier-revenue', verifyToken, checkRole(['Менеджер']), receiptController.getCashierTotalRevenue);
router.get('/total-revenue', verifyToken, checkRole(['Менеджер']), receiptController.getTotalRevenue);

export default router;