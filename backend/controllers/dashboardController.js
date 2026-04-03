const income = require('../models/Income');
const expense = require('../models/Expense');
const { isValidObjectId, Types } = require('mongoose');

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

        const totalIncome = await income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) });

        const totalExpense = await expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const last60DaysIncomeTransactions = await income.find({
            userId: userObjectId, 
            date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 60))
            }
        }).sort({ date: -1 });
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const last30DaysIncomeTransactions = await income.find({
            userId: userObjectId, 
            date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        }).sort({ date: -1 });
        const incomeLast30Days = last30DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const last60DaysExpenseTransactions = await expense.find({
            userId: userObjectId, 
            date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 60))
            }
        }).sort({ date: -1 });
        const expenseLast60Days = last60DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const last30DaysExpenseTransactions = await expense.find({
            userId: userObjectId, 
            date: {
                $gte: new Date(new Date().setDate(new Date().getDate() - 30))
            }
        }).sort({ date: -1 });
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        const last5Transactions = [
            ...(await income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map( 
                (txn) => ({
                    ...txn.toObject(),
                    type: 'income'
                })
            ),
            ...(await expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map( 
                (txn) => ({
                    ...txn.toObject(),
                    type: 'expense'
                })
            )
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

        res.status(200).json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            incomeLast60Days,
            incomeLast30Days,
            expenseLast60Days,
            expenseLast30Days,
            last5Transactions
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error, please try again later',
            error: error.message,
        });
    }
};