const xlsx = require('xlsx');
const path = require('path'); 
const Expense = require('../models/Expense');

exports.addExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const newExpense = new Expense({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message,
        });
    }
};

exports.getAllExpense = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message,
        });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    try {
        const expense = await Expense.findById(id);

        if (!expense) {
            return res.status(404).json({
                success: false,
                message: 'Expense not found'
            });
        }

        if (expense.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own expense records'
            });
        }

        await Expense.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Expense deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
            error: error.message
        });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1 });
        const data = expenses.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0],
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Expense');


        const filePath = path.join(__dirname, '../uploads/expense.xlsx');
        xlsx.writeFile(wb, filePath);

        res.download(filePath, 'expense.xlsx', (err) => {
            if (err) {
                console.error('Error downloading file:', err);

                if (!res.headersSent) {
                    res.status(500).json({ message: 'Error downloading file' });
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message,
        });
    }
};