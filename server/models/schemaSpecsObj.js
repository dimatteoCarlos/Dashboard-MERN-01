//schemaSpecs.js
import mongoose from 'mongoose';

export const schemaSpecsObj = {
  userSpecs: {
    name: { type: String, required: true, min: 2, max: 100 },
    email: { type: String, required: true, max: 50, unique: true },

    password: { type: String, required: true, min: 5 },

    occupation: { type: String },

    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ['user', 'admin', 'superadmin'],
      default: 'admin',
    },
  },
//------------------
  productSpecs: {
    name: { type: String, required: true, min: 4, max: 10 },
    price: { type: Number, required: true },

    // productId:String,

    description: { type: String, required: true, min: 5 },

    category: { type: String },
    rating: Number,
    supply: Number,
  },

  productStatSpecs: {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,

    monthlyData: [{ month: String, totalSales: Number, totalUnits: Number }],
    dailyData: {
      date: String,
      totalSales: Number,
      totalUnits: Number,
    },
  },
//------------------
  overallStatSpecs: {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },

  },
//-----------------------
  transactionsSpecs: {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
//-----------------------
  affiliateStatSpecs: {
    userId: { type: mongoose.Types.ObjectId, ref: 'User' },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: 'Transaction',
    },
  },
};


