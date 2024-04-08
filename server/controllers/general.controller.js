//controllers/general.controller.js

import Models from '../models/CollectionModels.js';

const UserModel = Models[0].collectionModel;

export const getUser = async (req, res) => {
  try {
    const { params, body } = req;
    const { id } = req.params;

    const user = await UserModel.findById(id);

    res.status(200).json(user);
  } catch (error) {
    console.error({ error });
    res.status(404).json({ message: error.message, status: error.status });
  }
};
//--------------------------

export const getDashboardStats = async (req, res) => {
  try {
    const OverallStatModel = Models[3].collectionModel;

    const TransactionsModel = Models[4].collectionModel;

    //hardcoded data:
    const currentMonth = 'April';
    const currentYear = 2021;
    const currentDay = '2021-04-08';
    //Overall Stats
    const overallStats = await OverallStatModel.find({ year: currentYear });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      dailyData,
      salesByCategory,
    } = overallStats[0];
    //----------month
    const monthlySales = monthlyData.find(
      (monthData) => monthData.month === currentMonth
    ).totalSales;

    const currentMonthStats = monthlyData.find(({ month }) => {
      return month === currentMonth;
    });

    //----------date-------
    const salesToday = dailyData.find(
      (dayData) => currentDay === dayData.date
    ).totalSales;

    console.log('🚀 ~ getDashboardStats ~ salesToday:', salesToday);

    const todayStats = dailyData.find(({ date }) => {
      return date === currentDay;
    });
    console.log('🚀 ~ todayStats ~ todayStats:', todayStats);
    //------------------------------
    //Recent Transactions
    const transactions = await TransactionsModel.find()
      .limit(25)
      .sort({ createdOn: -1 });
    //-------------------------
    res.status(200).json({
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      salesByCategory,

      monthlySales,
      salesToday,

      currentMonthStats,
      todayStats,
      transactions,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
