import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  basicDetails: {
    name: String,
    mobile: String,
    pan: String,
    score: String,
  },
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    securedBalance: Number,
    unsecuredBalance: Number,
    totalBalance: Number,
    last7DaysEnquiries: Number,
  },
  accounts: [{
    bank: String,
    accountNumber: String,
    currentBalance: Number,
    amountOverdue: Number,
    address: String,
  }]
}, { timestamps: true });

export default mongoose.model('CreditReport', reportSchema);
