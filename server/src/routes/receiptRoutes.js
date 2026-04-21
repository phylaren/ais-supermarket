import { Router } from 'express';
import * as receiptController from '../controllers/receiptController.js';
import { verifyToken, checkRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', verifyToken,  checkRole(['Менеджер']), receiptController.getReceipts);
router.get('/my-receipts', verifyToken, checkRole(['Касир']), receiptController.getReceiptsByEmployee);

router.post('/', verifyToken, checkRole(['Касир']), receiptController.insertData);
router.delete('/:id_check', verifyToken, checkRole(['Менеджер']), receiptController.deleteReceipt);
router.patch('/:id_check', receiptController.updateData);//delete

//all receipts of a certain cashier for a period of time (manager enters three values, cashier enters only dates, their surname is added automatically)
router.get('/report-cashier', verifyToken, checkRole(['Менеджер', 'Касир']), receiptController.getCashierReport);
//all receipts in the store for a certain period
router.get('/sales-report', verifyToken, checkRole(['Менеджер']), receiptController.getGeneralSalesReport);
//all receipts of a certain cashier for a day (for the cashier)
router.get('/daily-cashier-report', verifyToken, checkRole(['Касир', 'Менеджер']), receiptController.getCashierDailyReport);
//search for information by receipt number (for the cashier)
router.get('/by-id/:id', verifyToken, checkRole(['Менеджер', 'Касир']), receiptController.getReceiptDetails);
//Total sum of receipts for a specific cashier over a specific time
router.get('/cashier-revenue', verifyToken, checkRole(['Менеджер']), receiptController.getCashierTotalRevenue);
//Total sum of store receipts for a specific period
router.get('/total-revenue', verifyToken, checkRole(['Менеджер']), receiptController.getTotalRevenue);

export default router;