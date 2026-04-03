const express = require('express');


const {addExpense, 
    getAllExpense, 
    deleteExpense, 
    downloadExpenseExcel
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to add income
router.post('/add', protect, addExpense);
router.get('/getAll',protect, getAllExpense);
router.delete('/:id',protect, deleteExpense);
router.get('/download-excel',protect, downloadExpenseExcel);

module.exports = router;