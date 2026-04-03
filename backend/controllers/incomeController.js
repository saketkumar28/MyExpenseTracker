const xlsx = require('xlsx');
const path = require('path');
const Income = require('../models/Income');

exports.addIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'Please fill all fields' });
        }
        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });
        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message,
        });
    }
};

exports.getAllIncome = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        res.status(200).json(incomes);
    } catch (error) {
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message,
        });
    }
};

exports.deleteIncome = async (req, res) => {
    const { id } = req.params;
    try {
        const income = await Income.findById(id);

        if (!income) {
            return res.status(404).json({
                success: false,
                message: 'Income not found'
            });
        }

        if (income.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only delete your own income records'
            });
        }

        await Income.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Income deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server error, please try again later',
            error: error.message
        });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        const data = incomes.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0], 
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, 'Income');


        const filePath = path.join(__dirname, '../uploads/income.xlsx');
        xlsx.writeFile(wb, filePath);

        res.download(filePath, 'income.xlsx', (err) => {
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