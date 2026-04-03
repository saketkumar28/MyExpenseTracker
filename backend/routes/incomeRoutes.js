const express = require('express');

const {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} = require('../controllers/incomeController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Route to add income
router.post('/add', protect, addIncome);
router.get('/getAll', protect, getAllIncome);
router.delete('/:id', protect, deleteIncome);
router.get('/download-excel', protect, downloadIncomeExcel);

module.exports = router;