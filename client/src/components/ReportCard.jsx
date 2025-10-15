import { CreditCard, User, IndianRupee, TrendingUp } from "lucide-react";

export default function ReportCard({ report }) {
  const { basicDetails, reportSummary, accounts } = report;

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-100 flex items-center gap-2">
            <User className="w-5 h-5 text-purple-800" />
            {basicDetails.name || "Unknown User"}
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            PAN: <span className="font-medium text-neutral-500">{basicDetails.pan}</span> | 
            Mobile: <span className="font-medium text-neutral-500">{basicDetails.mobile}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-500">Credit Score</p>
          <p className="text-3xl font-bold text-green-600">{basicDetails.score}</p>
        </div>
      </div>

      <div className="border-t border-neutral-700 mb-6" />

      {/* Report Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-950 p-4 rounded-xl">
          <p className="text-sm text-blue-100 font-medium">Total Accounts</p>
          <p className="text-xl font-semibold text-blue-100">{reportSummary.totalAccounts}</p>
        </div>
        <div className="bg-green-950 p-4 rounded-xl">
          <p className="text-sm text-green-100 font-medium">Active Accounts</p>
          <p className="text-xl font-semibold text-green-100">{reportSummary.activeAccounts}</p>
        </div>
        <div className="bg-neutral-800 p-4 rounded-xl">
          <p className="text-sm text-gray-200 font-medium">Closed Accounts</p>
          <p className="text-xl font-semibold text-gray-200">{reportSummary.closedAccounts}</p>
        </div>
        <div className="bg-purple-900 p-4 rounded-xl col-span-2 md:col-span-1">
          <p className="text-sm text-purple-100 font-medium flex items-center gap-1">
             Total Balance
          </p>
          <p className="text-xl font-semibold text-purple-100">₹{reportSummary.totalBalance}</p>
        </div>
      </div>

      {/* Accounts Section */}
      <h3 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-purple-700" /> Accounts Overview
      </h3>

      <div className="space-y-4">
        {accounts.map((acc, idx) => (
          <div
            key={idx}
            className="border border-neutral-800 rounded-xl p-4 hover:bg-neutral-800 transition"
          >
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-gray-300 capitalize">{acc.bank}</p>
              <p className="text-xs text-gray-300">{acc.accountNumber}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <p>Current Balance: <span className="font-semibold text-gray-600">₹{acc.currentBalance}</span></p>
              <p>Overdue: <span className="font-semibold text-red-500">₹{acc.amountOverdue}</span></p>
            </div>
            <p className="text-sm text-gray-500 mt-1">City: {acc.address}</p>
          </div>
        ))}
      </div>

      {/* Trend Indicator (Optional Future Enhancement) */}
      <div className="flex justify-end mt-6 text-sm text-gray-500">
        <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
        Last 7 days enquiries: {reportSummary.last7DaysEnquiries || 0}
      </div>
    </div>
  );
}
